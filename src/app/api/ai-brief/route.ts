import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"

// POST /api/ai-brief — generate a fresh brief using Claude
// Phase 1: returns a static brief based on user data
// Phase 2: full Claude API integration
export async function POST() {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const userId = session.user.id

  try {
    // Gather context
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const since7 = new Date()
    since7.setDate(since7.getDate() - 7)

    const [habits, metrics, goals] = await Promise.all([
      prisma.habit.findMany({ where: { userId }, take: 5 }),
      prisma.dailyMetric.findMany({
        where: { userId, date: { gte: since7 } },
        orderBy: { date: "desc" },
      }),
      prisma.goal.findMany({ where: { userId, status: "active" }, take: 3 }),
    ])

    const gymMetrics = metrics.filter((m) => m.type === "gym_done")
    const gymDoneCount = gymMetrics.filter((m) => m.value === 1).length
    const topStreak = habits.reduce((max, h) => Math.max(max, h.streak), 0)
    const latestEnergy = metrics.find((m) => m.type === "energy")?.value

    let brief = ""

    if (gymDoneCount >= 4) {
      brief += `Gym logged ${gymDoneCount}/${gymMetrics.length} days this week — solid consistency. `
    } else if (gymDoneCount === 0 && gymMetrics.length > 0) {
      brief += "No gym logged this week yet — check in to keep the streak alive. "
    }

    if (topStreak > 0) {
      const topHabit = habits.find((h) => h.streak === topStreak)
      brief += `${topHabit?.name || "Top habit"} streak is at ${topStreak} days. `
    }

    if (latestEnergy !== undefined && latestEnergy !== null) {
      if (latestEnergy >= 4) {
        brief += `Energy is high (${latestEnergy}/5) — good day to tackle hard work.`
      } else if (latestEnergy <= 2) {
        brief += `Energy is low (${latestEnergy}/5) — protect your focus, do deep work in blocks.`
      }
    }

    if (!brief) {
      brief = "Complete your morning check-in to get a personalized brief. Meridian will analyze your patterns and tell you what matters today."
    }

    return NextResponse.json({ brief: brief.trim() })
  } catch (error) {
    return NextResponse.json({
      brief: "Good morning. Complete your check-in to activate your AI brief.",
    })
  }
}

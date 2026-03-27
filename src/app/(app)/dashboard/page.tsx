import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { DashboardClient } from "./dashboard-client"

async function getDashboardData(userId: string) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Habits with today's logs
  const habits = await prisma.habit.findMany({
    where: { userId },
    include: {
      logs: {
        where: { date: today },
      },
    },
  })

  // Recent metrics (last 7 days)
  const since7 = new Date()
  since7.setDate(since7.getDate() - 7)
  const metrics = await prisma.dailyMetric.findMany({
    where: { userId, date: { gte: since7 } },
    orderBy: { date: "desc" },
  })

  // Active goals
  const goals = await prisma.goal.findMany({
    where: { userId, status: "active" },
    orderBy: { createdAt: "desc" },
    take: 5,
  })

  // Today's journal
  const journal = await prisma.journalEntry.findFirst({
    where: { userId, date: today },
  })

  // Check if check-in done today (has gym_done metric for today)
  const todayMetrics = metrics.filter((m) => {
    const d = new Date(m.date)
    d.setHours(0, 0, 0, 0)
    return d.getTime() === today.getTime()
  })
  const checkInDone = todayMetrics.some((m) => m.type === "gym_done")

  const completedHabitsToday = habits.filter((h) => h.logs.length > 0).length
  const totalHabitsToday = habits.length

  return {
    habits,
    metrics,
    goals,
    journal,
    completedHabitsToday,
    totalHabitsToday,
    checkInDone,
    aibrief: null as string | null, // Phase 2: fetch from AI brief table
  }
}

export default async function DashboardPage() {
  const session = await auth()
  if (!session?.user?.id) return null

  const data = await getDashboardData(session.user.id)
  const userName = session.user.name?.split(" ")[0] || "Ash"

  return <DashboardClient data={data} userName={userName} />
}

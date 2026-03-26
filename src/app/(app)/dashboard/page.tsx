import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { DashboardClient } from "./dashboard-client"

async function getDashboardData(userId: string) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const todayStr = today.toISOString().split("T")[0]

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
    orderBy: { timeframe: "asc" },
    take: 5,
  })

  // Today's journal
  const journal = await prisma.journalEntry.findFirst({
    where: { userId, date: today },
  })

  const completedHabitsToday = habits.filter((h) => h.logs.length > 0).length
  const totalHabitsToday = habits.length

  return {
    habits,
    metrics,
    goals,
    journal,
    completedHabitsToday,
    totalHabitsToday,
  }
}

export default async function DashboardPage() {
  const session = await auth()
  if (!session?.user?.id) return null

  const data = await getDashboardData(session.user.id)
  const userName = session.user.name?.split(" ")[0] || "Ash"

  return <DashboardClient data={data} userName={userName} />
}

import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  const body = await req.json()
  const date = body.date || new Date().toISOString().split("T")[0]

  // Toggle: if already logged, remove it
  const existing = await prisma.habitLog.findFirst({
    where: {
      habitId: id,
      userId: session.user.id,
      date: new Date(date),
    },
  })

  if (existing) {
    await prisma.habitLog.delete({ where: { id: existing.id } })
    // Update streak
    await recalcStreak(id, session.user.id)
    return NextResponse.json({ completed: false })
  }

  await prisma.habitLog.create({
    data: {
      habitId: id,
      userId: session.user.id,
      date: new Date(date),
      completed: true,
    },
  })

  await recalcStreak(id, session.user.id)
  return NextResponse.json({ completed: true })
}

async function recalcStreak(habitId: string, userId: string) {
  const logs = await prisma.habitLog.findMany({
    where: { habitId, userId, completed: true },
    orderBy: { date: "desc" },
  })

  let streak = 0
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  for (let i = 0; i < logs.length; i++) {
    const logDate = new Date(logs[i].date)
    logDate.setHours(0, 0, 0, 0)
    const expected = new Date(today)
    expected.setDate(today.getDate() - i)
    expected.setHours(0, 0, 0, 0)
    if (logDate.getTime() === expected.getTime()) {
      streak++
    } else {
      break
    }
  }

  await prisma.habit.update({
    where: { id: habitId },
    data: { streak },
  })
}

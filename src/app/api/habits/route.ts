import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { z } from "zod"

const createHabitSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  category: z.enum(["health", "work", "personal", "finance"]),
  frequency: z.enum(["daily", "weekly"]).default("daily"),
  color: z.string().default("#6366f1"),
  icon: z.string().default("⭐"),
})

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const habits = await prisma.habit.findMany({
    where: { userId: session.user.id },
    include: {
      logs: {
        where: {
          date: {
            gte: new Date(new Date().setDate(new Date().getDate() - 30)),
          },
        },
        orderBy: { date: "desc" },
      },
    },
    orderBy: { createdAt: "asc" },
  })

  // Calculate streaks and today's completion
  const today = new Date().toISOString().split("T")[0]
  const habitsWithStats = habits.map((habit) => {
    const todayLog = habit.logs.find((l) => l.date.toISOString().split("T")[0] === today)
    return {
      ...habit,
      completedToday: todayLog?.completed ?? false,
    }
  })

  return NextResponse.json(habitsWithStats)
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()
  const data = createHabitSchema.parse(body)

  const habit = await prisma.habit.create({
    data: {
      ...data,
      userId: session.user.id,
    },
  })

  return NextResponse.json(habit)
}

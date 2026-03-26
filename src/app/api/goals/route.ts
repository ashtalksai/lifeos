import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { z } from "zod"

const createGoalSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  category: z.enum(["career", "health", "money", "personal", "relationship"]),
  timeframe: z.enum(["30yr", "5yr", "1yr", "quarterly", "monthly", "weekly"]),
  targetDate: z.string().optional(),
  parentId: z.string().optional(),
  progress: z.number().min(0).max(100).default(0),
})

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const goals = await prisma.goal.findMany({
    where: { userId: session.user.id },
    include: {
      children: true,
      parent: true,
    },
    orderBy: [{ timeframe: "asc" }, { createdAt: "asc" }],
  })

  return NextResponse.json(goals)
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()
  const data = createGoalSchema.parse(body)

  const goal = await prisma.goal.create({
    data: {
      ...data,
      userId: session.user.id,
      targetDate: data.targetDate ? new Date(data.targetDate) : undefined,
    },
  })

  return NextResponse.json(goal)
}

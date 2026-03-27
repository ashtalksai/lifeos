import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"

export async function GET(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const days = parseInt(searchParams.get("days") ?? "7")

  const since = new Date()
  since.setDate(since.getDate() - days)

  const metrics = await prisma.dailyMetric.findMany({
    where: {
      userId: session.user.id,
      date: { gte: since },
    },
    orderBy: { date: "desc" },
  })

  return NextResponse.json({ metrics })
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()
  const { date, type, value, note } = body

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const metricDate = date ? new Date(date) : today
  metricDate.setHours(0, 0, 0, 0)

  const metric = await prisma.dailyMetric.upsert({
    where: {
      userId_date_type: {
        userId: session.user.id,
        date: metricDate,
        type,
      },
    },
    update: { value: parseFloat(value), note },
    create: {
      userId: session.user.id,
      date: metricDate,
      type,
      value: parseFloat(value),
      note,
    },
  })

  return NextResponse.json(metric)
}

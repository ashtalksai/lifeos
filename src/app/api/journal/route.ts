import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"

export async function GET(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const limit = parseInt(searchParams.get("limit") ?? "30")

  const entries = await prisma.journalEntry.findMany({
    where: { userId: session.user.id },
    orderBy: { date: "desc" },
    take: limit,
  })

  return NextResponse.json(entries)
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()
  const { date, content, mood, energy, gratitude } = body

  const entryDate = new Date(date || new Date().toISOString().split("T")[0])

  const entry = await prisma.journalEntry.upsert({
    where: {
      userId_date: {
        userId: session.user.id,
        date: entryDate,
      },
    },
    update: { content, mood, energy, gratitude, updatedAt: new Date() },
    create: {
      userId: session.user.id,
      date: entryDate,
      content,
      mood,
      energy,
      gratitude,
    },
  })

  return NextResponse.json(entry)
}

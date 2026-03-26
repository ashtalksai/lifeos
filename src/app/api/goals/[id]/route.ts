import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  const body = await req.json()

  const goal = await prisma.goal.update({
    where: { id, userId: session.user.id },
    data: {
      ...body,
      updatedAt: new Date(),
    },
  })

  return NextResponse.json(goal)
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params

  await prisma.goal.delete({
    where: { id, userId: session.user.id },
  })

  return NextResponse.json({ success: true })
}

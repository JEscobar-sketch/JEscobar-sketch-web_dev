import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const notes = await prisma.note.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json(notes)
}

export async function POST(request: Request) {
  const payload = await request.json()
  const { title, content } = payload
  if (!title) return NextResponse.json({ error: 'title required' }, { status: 400 })

  const note = await prisma.note.create({ data: { title, content } })
  return NextResponse.json(note, { status: 201 })
}

import { prisma } from '@/lib/prisma'
import NotesApp from '@/components/NotesApp'
import './globals.css'

export const metadata = {
  title: 'JEscobar Sketch – Notes',
  description: 'A tiny demo app built with Next.js + Prisma + PostgreSQL'
}

export default async function Page() {
  const notes = await prisma.note.findMany({ orderBy: { createdAt: 'desc' } })

  // serialize dates to strings for client components
  const initial = notes.map((n) => ({ ...n, createdAt: n.createdAt.toISOString() }))

  return (
    <main className="container">
      <div className="card">
        <div className="heading">
          <h1>Notes — Next.js + Prisma + PostgreSQL</h1>
        </div>
        <p className="muted">Small fullstack demo app (create notes, backed by Postgres via Prisma)</p>
      </div>

      <div style={{ marginTop: 16 }}>
        <NotesApp initial={initial} />
      </div>
    </main>
  )
}

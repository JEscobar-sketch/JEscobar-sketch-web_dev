"use client"
import React from 'react'
import type { Note } from '@/types/note'

export default function NoteList({ notes }: { notes: Note[] }) {
  if (!notes || notes.length === 0) return <div className="muted">No notes yet — add your first one.</div>

  return (
    <div className="notes">
      {notes.map((n) => (
        <article key={n.id} className="note card">
          <h4>{n.title}</h4>
          {n.content && <p className="muted">{n.content}</p>}
          <div className="muted" style={{ marginTop: 8 }}>{new Date(n.createdAt).toLocaleString()}</div>
        </article>
      ))}
    </div>
  )
}

"use client"
import React, { useEffect, useState } from 'react'
import NoteList from './NoteList'
import NewNoteForm from './NewNoteForm'
import type { Note } from '@/types/note'

export default function NotesApp({ initial }: { initial: Note[] }) {
  const [notes, setNotes] = useState<Note[]>(initial ?? [])

  async function refresh() {
    const res = await fetch('/api/notes')
    const data = await res.json()
    setNotes(data)
  }

  useEffect(() => { setNotes(initial ?? []) }, [initial])

  return (
    <div>
      <NewNoteForm onCreate={refresh} />
      <NoteList notes={notes} />
    </div>
  )
}

"use client"
import React, { useState } from 'react'

export default function NewNoteForm({ onCreate }: { onCreate?: () => void }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (!title.trim()) return setError('Title is required')
    try {
      setLoading(true)
      const res = await fetch('/api/notes', { method: 'POST', body: JSON.stringify({ title, content }), headers: { 'Content-Type': 'application/json' }})
      if (!res.ok) throw new Error('Failed')
      setTitle('')
      setContent('')
      onCreate?.()
    } catch (err) {
      setError('Could not create note')
    } finally { setLoading(false) }
  }

  return (
    <form onSubmit={submit} className="card" style={{ marginTop: 12 }}>
      <label style={{ display: 'block', fontWeight: 600 }}>Title</label>
      <input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="What's on your mind?" style={{ width: '100%', padding: 8, borderRadius: 6, marginTop: 8 }} />
      <label style={{ display: 'block', fontWeight: 600, marginTop: 12 }}>Content (optional)</label>
      <textarea value={content} onChange={(e)=>setContent(e.target.value)} placeholder="Details" style={{ width: '100%', padding: 8, borderRadius: 6, marginTop: 8 }} rows={4} />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12 }}>
        <div className="muted">{error ?? (loading ? 'Creating…' : '')}</div>
        <button type="submit" style={{ background: 'var(--accent)', color: 'white', border: 'none', padding: '8px 14px', borderRadius: 8 }}>{loading ? 'Saving…' : 'Create'}</button>
      </div>
    </form>
  )
}

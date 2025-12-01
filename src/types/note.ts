export interface Note {
  id: number
  title: string
  // content can be nullable in DB; make it explicit
  content: string | null
  // client may pass strings (ISO) or Date objects — accept both
  createdAt: Date | string
}

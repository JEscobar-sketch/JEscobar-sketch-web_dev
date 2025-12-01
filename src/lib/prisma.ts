import { PrismaClient } from '@prisma/client'

declare global {
  // eslint-disable-next-line no-var
  // `var __prisma?: T` is invalid TypeScript syntax inside a global var declaration —
  // use `T | undefined` instead so the file compiles both under ts and swc.
  var __prisma: PrismaClient | undefined
}

export const prisma = global.__prisma ?? new PrismaClient()
if (process.env.NODE_ENV === 'development') global.__prisma = prisma

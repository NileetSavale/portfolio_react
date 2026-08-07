import { NextResponse, type NextRequest } from 'next/server'
import { checkCredentials, signToken, COOKIE } from '@/lib/auth'

// In-memory rate limiter: 5 attempts per 15 min per IP
const attempts = new Map<string, { count: number; resetAt: number }>()
const LIMIT  = 5
const WINDOW = 15 * 60 * 1000

function rateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = attempts.get(ip)
  if (!entry || now > entry.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW })
    return true
  }
  if (entry.count >= LIMIT) return false
  entry.count++
  return true
}

function getIp(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'
  )
}

export async function POST(req: NextRequest) {
  if (!rateLimit(getIp(req))) {
    return NextResponse.json({ error: 'Too many attempts' }, { status: 429 })
  }

  let user: unknown, pass: unknown
  try {
    const body = await req.json()
    user = body?.user
    pass = body?.pass
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  if (typeof user !== 'string' || typeof pass !== 'string' || !user.trim() || !pass.trim()) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
  }

  if (!checkCredentials(user, pass)) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  const token = await signToken(user)
  const res   = NextResponse.json({ ok: true })
  res.cookies.set(COOKIE, token, {
    httpOnly: true,
    sameSite: 'strict',
    path:     '/',
    maxAge:   60 * 60 * 8,
  })
  return res
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true })
  res.cookies.set(COOKIE, '', { maxAge: 0, path: '/' })
  return res
}

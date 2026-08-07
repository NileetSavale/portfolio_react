import { NextResponse, type NextRequest } from 'next/server'
import { readData, writeData, RESOURCES, type Resource } from '@/lib/store'
import { verifyToken, COOKIE } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

async function authed(req: NextRequest): Promise<boolean> {
  const token = req.cookies.get(COOKIE)?.value
  if (!token) return false
  return verifyToken(token)
}

// Reject requests whose Origin doesn't match the host (CSRF mitigation)
function sameOrigin(req: NextRequest): boolean {
  const origin = req.headers.get('origin')
  if (!origin) return true // non-browser / same-origin requests omit Origin
  try {
    return new URL(origin).host === req.headers.get('host')
  } catch {
    return false
  }
}

function resourceParam(req: NextRequest): Resource | null {
  const r = req.nextUrl.searchParams.get('resource') as Resource
  return r && RESOURCES.includes(r) ? r : null
}

export async function GET(req: NextRequest) {
  if (!await authed(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const resource = resourceParam(req)
  if (!resource) return NextResponse.json({ error: 'Unknown resource' }, { status: 400 })

  return NextResponse.json(await readData(resource))
}

export async function PUT(req: NextRequest) {
  if (!await authed(req))   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!sameOrigin(req))     return NextResponse.json({ error: 'Forbidden' },     { status: 403 })

  const resource = resourceParam(req)
  if (!resource) return NextResponse.json({ error: 'Unknown resource' }, { status: 400 })

  const len = parseInt(req.headers.get('content-length') ?? '0')
  if (len > 500_000) return NextResponse.json({ error: 'Payload too large' }, { status: 413 })

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  try {
    await writeData(resource, body)
  } catch {
    return NextResponse.json({ error: 'Save failed' }, { status: 500 })
  }

  revalidatePath('/')
  return NextResponse.json({ ok: true })
}

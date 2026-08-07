import { NextResponse, type NextRequest } from 'next/server'
import { verifyToken, COOKIE } from '@/lib/auth'

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl

  const isAdminPage = pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')
  const isAdminApi  = pathname.startsWith('/api/admin') && pathname !== '/api/admin/auth'

  if (isAdminPage || isAdminApi) {
    const token = req.cookies.get(COOKIE)?.value
    const valid = token && await verifyToken(token)

    if (!valid) {
      if (isAdminApi) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }
      const url = req.nextUrl.clone()
      url.pathname = '/admin/login'
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/((?!auth).*)'],
}

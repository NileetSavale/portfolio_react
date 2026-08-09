import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { verifyToken, COOKIE } from '@/lib/auth'

async function authed(req: NextRequest) {
  const token = req.cookies.get(COOKIE)?.value
  return token && await verifyToken(token)
}

export async function POST(req: NextRequest) {
  if (!await authed(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const form = await req.formData()
  const file = form.get('file') as File | null
  if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 })

  const ext  = file.name.split('.').pop()?.toLowerCase() ?? 'jpg'
  const name = `${Date.now()}.${ext}`
  const buf  = Buffer.from(await file.arrayBuffer())

  const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!)
  const { error } = await admin.storage.from('gallery').upload(name, buf, {
    contentType: file.type || 'image/jpeg',
    upsert: false,
  })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const { data } = admin.storage.from('gallery').getPublicUrl(name)
  return NextResponse.json({ url: data.publicUrl })
}

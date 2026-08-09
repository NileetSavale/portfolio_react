import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { verifyToken, COOKIE } from '@/lib/auth'
import { readData, writeData } from '@/lib/store'

async function authed(req: NextRequest) {
  const token = req.cookies.get(COOKIE)?.value
  return token && await verifyToken(token)
}

export async function POST(req: NextRequest) {
  if (!await authed(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const form = await req.formData()
    const file = form.get('file') as File | null
    if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 })

    const buf   = Buffer.from(await file.arrayBuffer())
    const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!)

    const { error } = await admin.storage.from('gallery').upload('resume.pdf', buf, {
      contentType: 'application/pdf',
      upsert: true,
    })
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    const { data } = admin.storage.from('gallery').getPublicUrl('resume.pdf')
    const url = `${data.publicUrl}?t=${Date.now()}`

    const personal = await readData<Record<string, unknown>>('personal')
    await writeData('personal', { ...personal, resumeUrl: url })

    return NextResponse.json({ url })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}

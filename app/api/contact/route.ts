import { NextResponse, type NextRequest } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND)

export async function POST(req: NextRequest) {
  let name: unknown, email: unknown, message: unknown
  try {
    const body = await req.json()
    name = body?.name; email = body?.email; message = body?.message
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  if (
    typeof name !== 'string' || !name.trim() ||
    typeof email !== 'string' || !email.includes('@') ||
    typeof message !== 'string' || !message.trim()
  ) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
  }

  const { error } = await resend.emails.send({
    from: 'Portfolio <onboarding@resend.dev>',
    to:   'savalenileet@gmail.com',
    replyTo: email,
    subject: `New message from ${name}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
        <div style="background:#060809;padding:24px;border-bottom:2px solid #f4c430">
          <h2 style="color:#f4c430;margin:0;letter-spacing:.1em;font-size:18px">NEW MESSAGE — PORTFOLIO</h2>
        </div>
        <div style="background:#0d1117;padding:24px;color:#e8dcc8">
          <p style="margin:0 0 8px"><span style="color:#f4c430;font-size:11px;letter-spacing:.2em;text-transform:uppercase">From</span></p>
          <p style="margin:0 0 20px;font-size:15px">${name} &lt;${email}&gt;</p>
          <p style="margin:0 0 8px"><span style="color:#f4c430;font-size:11px;letter-spacing:.2em;text-transform:uppercase">Message</span></p>
          <div style="background:#1a1f2e;padding:16px;border-left:3px solid #f4c430;font-size:14px;line-height:1.7">
            ${message.replace(/\n/g, '<br>')}
          </div>
        </div>
      </div>
    `,
  })

  if (error) {
    console.error('Resend error:', error)
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}

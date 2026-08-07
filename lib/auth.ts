// Edge-runtime compatible — uses globalThis.crypto.subtle (Web Crypto API)
const ENC = new TextEncoder()

function getSecret(): string {
  const s = process.env.ADMIN_SECRET
  if (!s) throw new Error('ADMIN_SECRET environment variable is required')
  return s
}

// Constant-time string comparison — prevents timing attacks on credential checks
function timingSafeEqual(a: string, b: string): boolean {
  const ab = ENC.encode(a)
  const bb = ENC.encode(b)
  const len = Math.max(ab.length, bb.length)
  const ap = new Uint8Array(len)
  const bp = new Uint8Array(len)
  ap.set(ab)
  bp.set(bb)
  let diff = ab.length ^ bb.length
  for (let i = 0; i < len; i++) diff |= ap[i] ^ bp[i]
  return diff === 0
}

async function importKey(secret: string) {
  return crypto.subtle.importKey(
    'raw', ENC.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false, ['sign', 'verify'],
  )
}

function b64uEncode(buf: ArrayBuffer): string {
  return btoa(String.fromCharCode(...new Uint8Array(buf)))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function b64uDecode(str: string): Uint8Array {
  const b64 = str.replace(/-/g, '+').replace(/_/g, '/').padEnd(
    str.length + (4 - str.length % 4) % 4, '='
  )
  return Uint8Array.from(atob(b64), c => c.charCodeAt(0))
}

export async function signToken(user: string): Promise<string> {
  const ts  = Date.now().toString()
  const key = await importKey(getSecret())
  const sig = await crypto.subtle.sign('HMAC', key, ENC.encode(`${user}:${ts}`))
  return b64uEncode(ENC.encode(`${user}:${ts}:${b64uEncode(sig)}`).buffer)
}

export async function verifyToken(token: string): Promise<boolean> {
  try {
    const raw   = new TextDecoder().decode(b64uDecode(token))
    const parts = raw.split(':')
    if (parts.length < 3) return false
    const sig     = b64uDecode(parts.pop()!)
    const payload = parts.join(':')
    const key     = await importKey(getSecret())
    return crypto.subtle.verify('HMAC', key, sig.buffer as ArrayBuffer, ENC.encode(payload))
  } catch {
    return false
  }
}

export function checkCredentials(user: string, pass: string): boolean {
  const eu = process.env.ADMIN_USER
  const ep = process.env.ADMIN_PASSWORD
  if (!eu || !ep) throw new Error('ADMIN_USER and ADMIN_PASSWORD environment variables are required')
  return timingSafeEqual(user, eu) && timingSafeEqual(pass, ep)
}

export const COOKIE = 'admin_session'

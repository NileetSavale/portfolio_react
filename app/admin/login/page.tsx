'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [user, setUser]   = useState('')
  const [pass, setPass]   = useState('')
  const [err,  setErr]    = useState('')
  const [busy, setBusy]   = useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setBusy(true); setErr('')
    const res = await fetch('/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user, pass }),
    })
    if (res.ok) router.push('/admin')
    else { setErr('Invalid credentials'); setBusy(false) }
  }

  return (
    <div className="min-h-screen bg-ink flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <p className="font-display text-[40px] tracking-[.15em] text-gold">NS<span className="text-paper">.</span></p>
          <p className="text-[9px] tracking-[.4em] uppercase text-paper/40 mt-1">Admin Portal</p>
        </div>
        <form onSubmit={submit} className="flex flex-col gap-4">
          <div>
            <label className="block text-[8px] tracking-[.38em] uppercase text-paper/50 mb-1.5">Username</label>
            <input
              value={user} onChange={e => setUser(e.target.value)} required autoFocus
              className="w-full bg-white/[.03] border border-white/10 text-paper px-4 py-3 text-[12px] outline-none focus:border-gold transition-colors font-mono"
            />
          </div>
          <div>
            <label className="block text-[8px] tracking-[.38em] uppercase text-paper/50 mb-1.5">Password</label>
            <input
              type="password" value={pass} onChange={e => setPass(e.target.value)} required
              className="w-full bg-white/[.03] border border-white/10 text-paper px-4 py-3 text-[12px] outline-none focus:border-gold transition-colors font-mono"
            />
          </div>
          {err && <p className="text-[10px] tracking-[.2em] text-crimson uppercase">{err}</p>}
          <button
            type="submit" disabled={busy}
            className="mt-2 px-6 py-3 bg-gold text-ink text-[9px] tracking-[.32em] uppercase border border-gold hover:bg-transparent hover:text-gold transition-all duration-200 disabled:opacity-50"
          >
            {busy ? 'Authenticating…' : 'Enter'}
          </button>
        </form>
      </div>
    </div>
  )
}

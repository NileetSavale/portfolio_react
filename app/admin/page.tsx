'use client'
import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'

// ── tiny helpers ──────────────────────────────────────────────────────────────

function input(cls = '') {
  return `w-full bg-white/[.03] border border-white/10 text-paper px-3 py-2 text-[11px] outline-none focus:border-gold transition-colors font-mono ${cls}`
}
function label(text: string) {
  return <label className="block text-[8px] tracking-[.32em] uppercase text-paper/45 mb-1">{text}</label>
}
function SaveBtn({ busy, onClick }: { busy: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} disabled={busy}
      className="px-5 py-2 bg-gold text-ink text-[8px] tracking-[.3em] uppercase border border-gold hover:bg-transparent hover:text-gold transition-all duration-200 disabled:opacity-40">
      {busy ? 'Saving…' : 'Save'}
    </button>
  )
}
function Toast({ msg }: { msg: string }) {
  if (!msg) return null
  return (
    <div className="fixed bottom-6 right-6 z-50 px-5 py-3 bg-gold text-ink text-[9px] tracking-[.25em] uppercase">
      {msg}
    </div>
  )
}
function SectionWrap({ title, children, onSave, busy }: { title: string; children: React.ReactNode; onSave: () => void; busy: boolean }) {
  return (
    <div className="mb-10">
      <div className="mb-5 pb-2 border-b border-white/10">
        <h2 className="font-heading text-[13px] tracking-[.25em] uppercase text-gold">{title}</h2>
      </div>
      {children}
      <div className="flex justify-end mt-6">
        <SaveBtn busy={busy} onClick={onSave} />
      </div>
    </div>
  )
}

// ── API helpers ───────────────────────────────────────────────────────────────

async function load(resource: string) {
  const r = await fetch(`/api/admin/data?resource=${resource}`)
  return r.json()
}
async function save(resource: string, data: unknown) {
  await fetch(`/api/admin/data?resource=${resource}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
}

// ── tab ids ───────────────────────────────────────────────────────────────────

const TABS = [
  { id: 'personal',   label: 'Personal'   },
  { id: 'hero',       label: 'Hero'       },
  { id: 'about',      label: 'About'      },
  { id: 'socials',    label: 'Socials'    },
  { id: 'skills',     label: 'Skills'     },
  { id: 'projects',   label: 'Projects'   },
  { id: 'experience', label: 'Experience' },
  { id: 'gallery',    label: 'Gallery'    },
  { id: 'resume',     label: 'Resume'     },
]

// ─────────────────────────────────────────────────────────────────────────────
export default function AdminPage() {
  const router  = useRouter()
  const [tab,   setTab]   = useState('personal')
  const [toast, setToast] = useState('')

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(''), 2800)
  }

  async function logout() {
    await fetch('/api/admin/auth', { method: 'DELETE' })
    router.push('/admin/login')
  }

  return (
    <div className="min-h-screen bg-ink flex font-mono" style={{ color: '#efe8da' }}>
      {/* Sidebar */}
      <aside className="w-52 shrink-0 bg-storm border-r border-white/8 flex flex-col">
        <div className="px-5 py-6 border-b border-white/8">
          <p className="font-display text-[22px] tracking-[.15em] text-gold">NS<span className="text-paper">.</span></p>
          <p className="text-[8px] tracking-[.35em] uppercase text-paper/35 mt-0.5">Admin</p>
        </div>
        <nav className="flex-1 py-4">
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`w-full text-left px-5 py-2.5 text-[9px] tracking-[.25em] uppercase transition-colors duration-150
                ${tab === t.id ? 'text-gold bg-gold/8 border-r border-gold' : 'text-paper/45 hover:text-paper'}`}>
              {t.label}
            </button>
          ))}
        </nav>
        <div className="px-5 py-4 border-t border-white/8">
          <button onClick={logout} className="text-[8px] tracking-[.25em] uppercase text-paper/30 hover:text-crimson transition-colors">
            Logout
          </button>
          <a href="/" target="_blank" className="block mt-1.5 text-[8px] tracking-[.25em] uppercase text-paper/30 hover:text-gold transition-colors no-underline">
            View Site ↗
          </a>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-9 overflow-y-auto">
        {tab === 'personal'   && <PersonalEditor  onSave={showToast} />}
        {tab === 'hero'       && <HeroEditor       onSave={showToast} />}
        {tab === 'about'      && <AboutEditor      onSave={showToast} />}
        {tab === 'socials'    && <SocialsEditor    onSave={showToast} />}
        {tab === 'skills'     && <SkillsEditor     onSave={showToast} />}
        {tab === 'projects'   && <ProjectsEditor   onSave={showToast} />}
        {tab === 'experience' && <ExperienceEditor onSave={showToast} />}
        {tab === 'gallery'    && <GalleryEditor    onSave={showToast} />}
        {tab === 'resume'     && <ResumeEditor     onSave={showToast} />}
      </main>

      <Toast msg={toast} />
    </div>
  )
}

// ── Personal ─────────────────────────────────────────────────────────────────

function PersonalEditor({ onSave }: { onSave: (m: string) => void }) {
  const [d, setD]     = useState<Record<string, unknown> | null>(null)
  const [busy, setBusy] = useState(false)

  useEffect(() => { load('personal').then(setD) }, [])
  if (!d) return <p className="text-paper/30 text-[11px]">Loading…</p>

  const f = (key: string) => (
    <div key={key} className="mb-3">
      {label(key)}
      <input value={String((d as Record<string, unknown>)[key] ?? '')}
        onChange={e => setD({ ...d, [key]: e.target.value })}
        className={input()} />
    </div>
  )

  async function handleSave() {
    setBusy(true)
    await save('personal', d)
    setBusy(false)
    onSave('Personal saved ✓')
  }

  return (
    <SectionWrap title="Personal Info" onSave={handleSave} busy={busy}>
      <div className="grid md:grid-cols-2 gap-x-8">
        {['name','nameKatakana','title','school','email','emailIU','github','linkedin','resumeUrl'].map(f)}
      </div>
      <div className="mt-4">
        {label('roles (comma-separated)')}
        <input value={(d.roles as string[]).join(', ')}
          onChange={e => setD({ ...d, roles: e.target.value.split(',').map(s => s.trim()) })}
          className={input()} />
      </div>
      <div className="mt-6">
        <p className="text-[8px] tracking-[.32em] uppercase text-paper/45 mb-3">Nav Links</p>
        {((d.navLinks ?? []) as { href: string; label: string }[]).map((link, i) => (
          <div key={i} className="flex gap-3 mb-2">
            <input value={link.label} placeholder="Label"
              onChange={e => { const nl = [...(d.navLinks as typeof link[])]; nl[i] = { ...nl[i], label: e.target.value }; setD({ ...d, navLinks: nl }) }}
              className={input('w-32')} />
            <input value={link.href} placeholder="href"
              onChange={e => { const nl = [...(d.navLinks as typeof link[])]; nl[i] = { ...nl[i], href: e.target.value }; setD({ ...d, navLinks: nl }) }}
              className={input()} />
          </div>
        ))}
      </div>
    </SectionWrap>
  )
}

// ── Hero ─────────────────────────────────────────────────────────────────────

function HeroEditor({ onSave }: { onSave: (m: string) => void }) {
  const [d, setD]     = useState<Record<string, unknown> | null>(null)
  const [busy, setBusy] = useState(false)

  useEffect(() => { load('content').then(setD) }, [])
  if (!d) return <p className="text-paper/30 text-[11px]">Loading…</p>

  const hero = d.hero as { eyebrow: string; subtitle: string }

  async function handleSave() {
    setBusy(true)
    await save('content', d)
    setBusy(false)
    onSave('Hero content saved ✓')
  }

  return (
    <SectionWrap title="Hero Content" onSave={handleSave} busy={busy}>
      <div className="mb-3">{label('Eyebrow text')}
        <input value={hero.eyebrow}
          onChange={e => setD({ ...d, hero: { ...hero, eyebrow: e.target.value } })}
          className={input()} /></div>
      <div>{label('Subtitle / roles line')}
        <input value={hero.subtitle}
          onChange={e => setD({ ...d, hero: { ...hero, subtitle: e.target.value } })}
          className={input()} /></div>
    </SectionWrap>
  )
}

// ── About ────────────────────────────────────────────────────────────────────

function AboutEditor({ onSave }: { onSave: (m: string) => void }) {
  const [content, setContent] = useState<Record<string, unknown> | null>(null)
  const [about,   setAbout]   = useState<{ tags: string[]; stats: [string,string][] } | null>(null)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    load('content').then(setContent)
    load('about').then(setAbout)
  }, [])

  if (!content || !about) return <p className="text-paper/30 text-[11px]">Loading…</p>

  const bio  = (content.about as { heading: string; bio: string[] })
  const tags = about.tags
  const stats = about.stats

  async function handleSave() {
    setBusy(true)
    await Promise.all([save('content', content), save('about', about)])
    setBusy(false)
    onSave('About saved ✓')
  }

  return (
    <SectionWrap title="About Section" onSave={handleSave} busy={busy}>
      <div className="mb-4">{label('Section heading')}
        <input value={bio.heading}
          onChange={e => setContent({ ...content, about: { ...bio, heading: e.target.value } })}
          className={input()} /></div>
      <div className="mb-5">
        {label('Bio paragraphs (one per line — HTML allowed)')}
        {bio.bio.map((p, i) => (
          <textarea key={i} value={p} rows={3}
            onChange={e => { const b = [...bio.bio]; b[i] = e.target.value; setContent({ ...content, about: { ...bio, bio: b } }) }}
            className={`${input()} resize-none mb-2`} />
        ))}
      </div>
      <div className="mb-4">{label('Tech tags (comma-separated)')}
        <input value={tags.join(', ')}
          onChange={e => setAbout({ ...about, tags: e.target.value.split(',').map(s => s.trim()) })}
          className={input()} /></div>
      <div>
        {label('Stats')}
        {stats.map(([val, lbl], i) => (
          <div key={i} className="flex gap-3 mb-2">
            <input value={val} placeholder="Value"
              onChange={e => { const s = [...stats] as [string,string][]; s[i] = [e.target.value, s[i][1]]; setAbout({ ...about, stats: s }) }}
              className={input('w-24')} />
            <input value={lbl} placeholder="Label"
              onChange={e => { const s = [...stats] as [string,string][]; s[i] = [s[i][0], e.target.value]; setAbout({ ...about, stats: s }) }}
              className={input()} />
          </div>
        ))}
      </div>
    </SectionWrap>
  )
}

// ── Socials ───────────────────────────────────────────────────────────────────

function SocialsEditor({ onSave }: { onSave: (m: string) => void }) {
  const [d, setD]     = useState<{ num: string; label: string; href: string; ext: boolean }[] | null>(null)
  const [busy, setBusy] = useState(false)

  useEffect(() => { load('socials').then(setD) }, [])
  if (!d) return <p className="text-paper/30 text-[11px]">Loading…</p>

  function update(i: number, key: string, val: unknown) {
    setD(d!.map((item, idx) => idx === i ? { ...item, [key]: val } : item))
  }
  function add() {
    setD([...d!, { num: String(d!.length + 1).padStart(2,'0'), label: '', href: '', ext: true }])
  }
  function remove(i: number) { setD(d!.filter((_, idx) => idx !== i)) }

  async function handleSave() {
    setBusy(true)
    await save('socials', d)
    setBusy(false)
    onSave('Socials saved ✓')
  }

  return (
    <SectionWrap title="Socials" onSave={handleSave} busy={busy}>
      {d.map((s, i) => (
        <div key={i} className="flex gap-3 mb-3 items-start">
          <input value={s.num} onChange={e => update(i, 'num', e.target.value)} className={input('w-10')} />
          <input value={s.label} placeholder="Label" onChange={e => update(i, 'label', e.target.value)} className={input('w-48')} />
          <input value={s.href} placeholder="URL or mailto:" onChange={e => update(i, 'href', e.target.value)} className={input()} />
          <label className="flex items-center gap-1.5 text-[9px] text-paper/45 whitespace-nowrap mt-2.5">
            <input type="checkbox" checked={s.ext} onChange={e => update(i, 'ext', e.target.checked)} />
            new tab
          </label>
          <button onClick={() => remove(i)} className="mt-2 text-crimson text-[10px] hover:opacity-70">✕</button>
        </div>
      ))}
      <button onClick={add} className="text-[9px] tracking-[.25em] uppercase text-gold/60 hover:text-gold mt-2">+ Add Social</button>
    </SectionWrap>
  )
}

// ── Skills ────────────────────────────────────────────────────────────────────

function SkillsEditor({ onSave }: { onSave: (m: string) => void }) {
  const [d, setD]     = useState<{ title: string; grad: string; skills: { name: string; level: string; pct: number }[] }[] | null>(null)
  const [busy, setBusy] = useState(false)

  useEffect(() => { load('skills').then(setD) }, [])
  if (!d) return <p className="text-paper/30 text-[11px]">Loading…</p>

  function updateSkill(ci: number, si: number, key: string, val: unknown) {
    setD(d!.map((cat, c) => c !== ci ? cat : {
      ...cat,
      skills: cat.skills.map((sk, s) => s !== si ? sk : { ...sk, [key]: val }),
    }))
  }
  function addSkill(ci: number) {
    setD(d!.map((cat, c) => c !== ci ? cat : {
      ...cat, skills: [...cat.skills, { name: '', level: 'Intermediate', pct: 50 }],
    }))
  }
  function removeSkill(ci: number, si: number) {
    setD(d!.map((cat, c) => c !== ci ? cat : { ...cat, skills: cat.skills.filter((_, s) => s !== si) }))
  }

  async function handleSave() {
    setBusy(true)
    await save('skills', d)
    setBusy(false)
    onSave('Skills saved ✓')
  }

  return (
    <SectionWrap title="Skills" onSave={handleSave} busy={busy}>
      {d.map((cat, ci) => (
        <div key={ci} className="mb-8">
          <p className="text-[9px] tracking-[.28em] uppercase text-gold mb-3">{cat.title}</p>
          {cat.skills.map((sk, si) => (
            <div key={si} className="flex gap-3 mb-2 items-center">
              <input value={sk.name} placeholder="Skill name"
                onChange={e => updateSkill(ci, si, 'name', e.target.value)} className={input()} />
              <select value={sk.level}
                onChange={e => updateSkill(ci, si, 'level', e.target.value)}
                className={`${input('w-36 shrink-0')} appearance-none`}>
                {['Beginner','Intermediate','Advanced','Expert'].map(l => <option key={l}>{l}</option>)}
              </select>
              <input type="range" min={0} max={100} value={sk.pct}
                onChange={e => updateSkill(ci, si, 'pct', Number(e.target.value))}
                className="w-24 shrink-0 accent-gold" />
              <span className="text-[10px] text-paper/45 w-8 shrink-0">{sk.pct}%</span>
              <button onClick={() => removeSkill(ci, si)} className="text-crimson text-[10px] hover:opacity-70">✕</button>
            </div>
          ))}
          <button onClick={() => addSkill(ci)} className="text-[9px] tracking-[.2em] uppercase text-gold/50 hover:text-gold mt-1">+ Add Skill</button>
        </div>
      ))}
    </SectionWrap>
  )
}

// ── Projects ─────────────────────────────────────────────────────────────────

type Project = { num: string; badge: string; badgeCls: string; title: string; desc: string; tech: string[]; links: { label: string; href: string }[] }

function ProjectsEditor({ onSave }: { onSave: (m: string) => void }) {
  const [d, setD]     = useState<Project[] | null>(null)
  const [busy, setBusy] = useState(false)

  useEffect(() => { load('projects').then(setD) }, [])
  if (!d) return <p className="text-paper/30 text-[11px]">Loading…</p>

  function update(i: number, key: string, val: unknown) {
    setD(d!.map((p, idx) => idx === i ? { ...p, [key]: val } : p))
  }
  function addProject() {
    const num = String(d!.length + 1).padStart(2,'0')
    setD([...d!, { num, badge: 'Coming Soon', badgeCls: 'bg-vivid/10 text-vivid border border-vivid/30', title: 'New Project', desc: '', tech: [], links: [] }])
  }
  function removeProject(i: number) { setD(d!.filter((_, idx) => idx !== i)) }

  async function handleSave() {
    setBusy(true)
    await save('projects', d)
    setBusy(false)
    onSave('Projects saved ✓')
  }

  return (
    <SectionWrap title="Projects" onSave={handleSave} busy={busy}>
      {d.map((p, i) => (
        <div key={i} className="mb-8 p-5 border border-white/8 bg-white/[.015]">
          <div className="flex justify-between mb-3">
            <span className="text-[9px] tracking-[.25em] uppercase text-gold">{p.num} — {p.title}</span>
            <button onClick={() => removeProject(i)} className="text-crimson text-[10px] hover:opacity-70">Remove</button>
          </div>
          <div className="grid md:grid-cols-2 gap-x-6 gap-y-3">
            <div>{label('Title')}<input value={p.title} onChange={e => update(i, 'title', e.target.value)} className={input()} /></div>
            <div>{label('Badge')}<input value={p.badge} onChange={e => update(i, 'badge', e.target.value)} className={input()} /></div>
          </div>
          <div className="mt-3">{label('Description')}
            <textarea value={p.desc} rows={3} onChange={e => update(i, 'desc', e.target.value)} className={`${input()} resize-none`} /></div>
          <div className="mt-3">{label('Tech stack (comma-separated)')}
            <input value={p.tech.join(', ')} onChange={e => update(i, 'tech', e.target.value.split(',').map(s => s.trim()))} className={input()} /></div>
          <div className="mt-3">{label('Links (label|url, comma-separated)')}
            <input
              value={p.links.map(l => `${l.label}|${l.href}`).join(', ')}
              onChange={e => update(i, 'links', e.target.value.split(',').map(s => {
                const [lbl, href] = s.trim().split('|')
                return { label: lbl?.trim() ?? '', href: href?.trim() ?? '' }
              }))}
              className={input()} /></div>
        </div>
      ))}
      <button onClick={addProject} className="text-[9px] tracking-[.25em] uppercase text-gold/60 hover:text-gold">+ Add Project</button>
    </SectionWrap>
  )
}

// ── Experience ───────────────────────────────────────────────────────────────

type TimelineItem = { date: string; dateCls: string; dotCls: string; role: string; org: string; desc: string }

function ExperienceEditor({ onSave }: { onSave: (m: string) => void }) {
  const [d, setD]     = useState<TimelineItem[] | null>(null)
  const [busy, setBusy] = useState(false)

  useEffect(() => { load('experience').then(setD) }, [])
  if (!d) return <p className="text-paper/30 text-[11px]">Loading…</p>

  function update(i: number, key: string, val: string) {
    setD(d!.map((item, idx) => idx === i ? { ...item, [key]: val } : item))
  }
  function addItem() {
    setD([...d!, { date: '', dateCls: 'text-gold', dotCls: 'border-gold', role: '', org: '', desc: '' }])
  }
  function removeItem(i: number) { setD(d!.filter((_, idx) => idx !== i)) }

  async function handleSave() {
    setBusy(true)
    await save('experience', d)
    setBusy(false)
    onSave('Experience saved ✓')
  }

  return (
    <SectionWrap title="Experience & Education" onSave={handleSave} busy={busy}>
      {d.map((item, i) => (
        <div key={i} className="mb-6 p-5 border border-white/8 bg-white/[.015]">
          <div className="flex justify-between mb-3">
            <span className="text-[9px] tracking-[.25em] uppercase text-gold">{item.role || 'New Entry'}</span>
            <button onClick={() => removeItem(i)} className="text-crimson text-[10px] hover:opacity-70">Remove</button>
          </div>
          <div className="grid md:grid-cols-2 gap-x-6 gap-y-3">
            <div>{label('Role / Degree')}<input value={item.role} onChange={e => update(i, 'role', e.target.value)} className={input()} /></div>
            <div>{label('Date range')}<input value={item.date} onChange={e => update(i, 'date', e.target.value)} className={input()} /></div>
            <div>{label('Organisation')}<input value={item.org} onChange={e => update(i, 'org', e.target.value)} className={input()} /></div>
          </div>
          <div className="mt-3">{label('Description')}
            <textarea value={item.desc} rows={3} onChange={e => update(i, 'desc', e.target.value)} className={`${input()} resize-none`} /></div>
        </div>
      ))}
      <button onClick={addItem} className="text-[9px] tracking-[.25em] uppercase text-gold/60 hover:text-gold">+ Add Entry</button>
    </SectionWrap>
  )
}

// ── Gallery ───────────────────────────────────────────────────────────────────

type GalleryItem = { num: string; src: string; caption: string; sub?: string; story?: string }

function GalleryEditor({ onSave }: { onSave: (m: string) => void }) {
  const [d, setD]         = useState<GalleryItem[] | null>(null)
  const [busy, setBusy]   = useState(false)
  const [uploading, setUploading] = useState<number | null>(null)
  const fileRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => { load('gallery').then(setD) }, [])
  if (!d) return <p className="text-paper/30 text-[11px]">Loading…</p>

  function update(i: number, key: string, val: string) {
    setD(d!.map((item, idx) => idx === i ? { ...item, [key]: val } : item))
  }
  function addItem() {
    const num = String(d!.length + 1).padStart(2, '0')
    setD([...d!, { num, src: '', caption: '', sub: '', story: '' }])
  }
  function removeItem(i: number) { setD(d!.filter((_, idx) => idx !== i)) }

  async function uploadPhoto(i: number, file: File) {
    setUploading(i)
    const form = new FormData()
    form.append('file', file)
    const res = await fetch('/api/admin/gallery', { method: 'POST', body: form })
    const json = await res.json()
    setUploading(null)
    if (json.url) update(i, 'src', json.url)
    else alert('Upload failed: ' + json.error)
  }

  async function handleSave() {
    setBusy(true)
    await save('gallery', d)
    setBusy(false)
    onSave('Gallery saved ✓')
  }

  return (
    <SectionWrap title="Gallery" onSave={handleSave} busy={busy}>
      {d.map((item, i) => (
        <div key={i} className="mb-8 p-5 border border-white/8 bg-white/[.015]">
          <div className="flex justify-between mb-4">
            <span className="text-[9px] tracking-[.25em] uppercase text-gold">{item.num} — {item.caption || 'New Photo'}</span>
            <button onClick={() => removeItem(i)} className="text-crimson text-[10px] hover:opacity-70">Remove</button>
          </div>

          {/* Photo preview + upload */}
          <div className="mb-4 flex gap-4 items-start">
            {item.src && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={item.src} alt={item.caption} className="w-48 aspect-video object-cover shrink-0 border border-white/10" />
            )}
            <div className="flex-1">
              {label('Photo URL')}
              <input value={item.src} onChange={e => update(i, 'src', e.target.value)} className={input('mb-2')} />
              <div className="flex items-center gap-3">
                <button
                  onClick={() => fileRefs.current[i]?.click()}
                  disabled={uploading === i}
                  className="px-4 py-1.5 border border-white/20 text-[8px] tracking-[.25em] uppercase text-paper/60 hover:border-gold hover:text-gold transition-all duration-200 disabled:opacity-40"
                >
                  {uploading === i ? 'Uploading…' : 'Upload Photo'}
                </button>
                <input
                  ref={el => { fileRefs.current[i] = el }}
                  type="file" accept="image/*" className="hidden"
                  onChange={e => { const f = e.target.files?.[0]; if (f) uploadPhoto(i, f) }}
                />
                <span className="text-[8px] text-paper/25">or paste URL above</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-x-6 gap-y-3 mb-3">
            <div>{label('Caption')}<input value={item.caption} onChange={e => update(i, 'caption', e.target.value)} className={input()} /></div>
            <div>{label('Sub-caption (location / date)')}<input value={item.sub ?? ''} onChange={e => update(i, 'sub', e.target.value)} className={input()} /></div>
          </div>
          <div>{label('Story (shown in lightbox)')}
            <textarea value={item.story ?? ''} rows={4} onChange={e => update(i, 'story', e.target.value)} className={`${input()} resize-none`} />
          </div>
        </div>
      ))}
      <button onClick={addItem} className="text-[9px] tracking-[.25em] uppercase text-gold/60 hover:text-gold">+ Add Photo</button>
    </SectionWrap>
  )
}

// ── Resume ────────────────────────────────────────────────────────────────────

function ResumeEditor({ onSave }: { onSave: (m: string) => void }) {
  const [currentUrl, setCurrentUrl] = useState<string | null>(null)
  const [uploading, setUploading]   = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    load('personal').then((d: Record<string, unknown>) => setCurrentUrl(String(d.resumeUrl ?? '')))
  }, [])

  async function handleFile(file: File) {
    if (file.type !== 'application/pdf') { alert('Please select a PDF file'); return }
    setUploading(true)
    const form = new FormData()
    form.append('file', file)
    const res  = await fetch('/api/admin/resume', { method: 'POST', body: form })
    const json = await res.json()
    setUploading(false)
    if (json.url) { setCurrentUrl(json.url); onSave('Resume updated ✓') }
    else alert('Upload failed: ' + json.error)
  }

  return (
    <div className="mb-10">
      <div className="mb-5 pb-2 border-b border-white/10">
        <h2 className="font-heading text-[13px] tracking-[.25em] uppercase text-gold">Resume</h2>
      </div>

      {/* Drop zone */}
      <div
        className="border-2 border-dashed border-white/15 hover:border-gold/40 transition-colors duration-200 p-12 flex flex-col items-center gap-5 cursor-pointer"
        onClick={() => fileRef.current?.click()}
        onDragOver={e => e.preventDefault()}
        onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) handleFile(f) }}
      >
        <div className="text-[32px] text-paper/20">↑</div>
        <p className="text-[10px] tracking-[.3em] uppercase text-paper/40">
          {uploading ? 'Uploading…' : 'Drop PDF here or click to browse'}
        </p>
        <input ref={fileRef} type="file" accept="application/pdf" className="hidden"
          onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f) }} />
      </div>

      {/* Current file */}
      {currentUrl && (
        <div className="mt-6 p-4 bg-white/[.03] border border-white/8">
          <p className="text-[8px] tracking-[.32em] uppercase text-paper/45 mb-2">Current Resume</p>
          <p className="text-[11px] font-mono text-paper/60 break-all mb-3">{currentUrl.split('?')[0]}</p>
          <a
            href={currentUrl}
            target="_blank"
            rel="noopener"
            className="text-[9px] tracking-[.25em] uppercase text-gold no-underline hover:opacity-70 transition-opacity"
          >
            Open PDF ↗
          </a>
        </div>
      )}
    </div>
  )
}

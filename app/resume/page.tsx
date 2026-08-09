import Link from 'next/link'
import { readData } from '@/lib/store'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Resume — Nileet Savale' }

export default async function ResumePage() {
  const personal = await readData<Record<string, unknown>>('personal')
  const PDF = String(personal.resumeUrl ?? '/Nileet-Savale-Resume.pdf')

  return (
    <main className="min-h-screen bg-ink flex flex-col">
      <div className="flex items-center justify-between px-8 py-4 border-b border-white/10">
        <Link
          href="/#experience"
          className="text-[9px] tracking-[.28em] uppercase text-paper/55 hover:text-paper transition-colors no-underline"
        >
          ← Back
        </Link>
        <span className="font-mono text-[10px] tracking-widest text-gold/60 uppercase">
          Nileet Savale · Resume
        </span>
        <a
          href={PDF}
          download="Nileet Savale's Resume.pdf"
          className="px-4 py-[7px] border border-gold/40 text-[9px] tracking-[.28em] uppercase text-gold no-underline hover:bg-gold hover:text-ink transition-all duration-200"
        >
          Download PDF
        </a>
      </div>
      <div className="flex-1 px-4 py-4">
        <iframe
          src={PDF}
          className="w-full h-full min-h-[85vh] rounded border-0"
          title="Nileet Savale Resume"
        />
      </div>
    </main>
  )
}

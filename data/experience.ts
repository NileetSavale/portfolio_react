export type TimelineItem = {
  date: string; dateCls: string; dotCls: string
  role: string; org: string; desc: string
}

export const TIMELINE: TimelineItem[] = [
  {
    date: 'Aug 2024 — Jul 2026', dateCls: 'text-gold', dotCls: 'border-gold',
    role: 'M.S. Computer Science',
    org:  'Indiana University · Bloomington, IN',
    desc: 'Graduate-level coursework and research in AI/ML, computer vision, and distributed systems. Focused on bridging theoretical depth with practical, deployed solutions.',
  },
  {
    date: '2024 — Present', dateCls: 'text-[#ff6b6b]', dotCls: 'border-crimson',
    role: 'Teaching Assistant — AI',
    org:  'Indiana University',
    desc: 'Design and grade assignments, lead office hours, mentor students through core AI concepts. Making machine learning approachable without sacrificing rigor.',
  },
  {
    date: '2024 — Present', dateCls: 'text-[#c06aff]', dotCls: 'border-vivid',
    role: 'Volunteer Researcher',
    org:  'Indiana University Research Lab',
    desc: 'Applied research in computer vision and NLP. Contributing to projects pushing the limits of perception, language understanding, and human-AI interaction.',
  },
  {
    date: 'Jul 2020 — Jun 2024', dateCls: 'text-gold', dotCls: 'border-gold',
    role: 'B.S. Computer Science',
    org:  'Savitribai Phule Pune University · GPA 8.9 / 10',
    desc: 'Graduated with distinction. Strong foundation in algorithms, systems programming, and applied AI. Thesis and published work spanning IoT and machine learning.',
  },
]

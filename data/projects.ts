export type Project = {
  num: string
  badge: string
  badgeCls: string
  title: string
  desc: string
  tech: string[]
  links: { label: string; href: string }[]
}

export const PROJECTS: Project[] = [
  {
    num: '01', badge: 'In Development',
    badgeCls: 'bg-flame/10 text-flame border border-flame/30',
    title: 'FlashCard AI',
    desc: 'PDF-to-flashcard converter with AI-powered quiz generation. Upload any study material and receive interactive flashcards with spaced repetition — making knowledge retention accessible.',
    tech: ['React Native', 'Firebase', 'AI / ML', 'Python'],
    links: [{ label: 'GitHub →', href: 'https://github.com/NileetSavale' }],
  },
  {
    num: '02', badge: 'Completed',
    badgeCls: 'bg-gold/8 text-gold border border-gold/30',
    title: 'LangViz',
    desc: 'Docker-containerized visualization platform supporting multi-language execution (Python & R). PostgreSQL backend provides persistent session state for reproducible research workflows.',
    tech: ['Docker', 'PostgreSQL', 'Python', 'R'],
    links: [{ label: 'GitHub →', href: 'https://github.com/NileetSavale' }],
  },
  {
    num: '03', badge: 'Published',
    badgeCls: 'bg-crimson/10 text-[#ff6b6b] border border-crimson/30',
    title: 'IoT Smart Dustbin',
    desc: 'IoT-powered waste management system with cloud analytics, reducing bin overflow by 60%. Published research demonstrating real-world impact of embedded AI in urban infrastructure.',
    tech: ['IoT', 'Cloud Analytics', 'Python', 'Embedded'],
    links: [
      { label: 'GitHub →', href: 'https://github.com/NileetSavale' },
      { label: 'Paper →',  href: '#' },
    ],
  },
  {
    num: '04', badge: 'Coming Soon',
    badgeCls: 'bg-vivid/10 text-vivid border border-vivid/30',
    title: 'More Projects',
    desc: 'Always building. Check GitHub for the latest experiments spanning computer vision, NLP, and full-stack engineering.',
    tech: ['GitHub'],
    links: [{ label: 'GitHub →', href: 'https://github.com/NileetSavale' }],
  },
]

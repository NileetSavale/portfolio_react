export const dynamic = 'force-dynamic'

import { readData } from '@/lib/store'
import Hero        from '@/components/sections/Hero'
import About       from '@/components/sections/About'
import Skills      from '@/components/sections/Skills'
import Projects    from '@/components/sections/Projects'
import Experience  from '@/components/sections/Experience'
import Contact     from '@/components/sections/Contact'
import Footer      from '@/components/sections/Footer'
export default function Home() {
  const personal   = readData('personal')   as Record<string, unknown>
  const content    = readData('content')    as Record<string, unknown>
  const aboutData  = readData('about')      as { tags: string[]; stats: [string,string][] }
  const socials    = readData('socials')    as Record<string, unknown>[]
  const skills     = readData('skills')     as Record<string, unknown>[]
  const projects   = readData('projects')   as Record<string, unknown>[]
  const experience = readData('experience') as Record<string, unknown>[]

  return (
    <main>
<Hero personal={personal} content={content} />
      <div style={{ position: 'relative', zIndex: 20, backgroundColor: '#060809' }}>
        <About
          content={content}
          about={aboutData}
          animePhoto={String(personal.animePhoto ?? '/anime-photo.jpg')}
          realPhoto={String(personal.realPhoto   ?? '/real-photo.jpg')}
        />
        <Skills cats={skills} />
        <Projects projects={projects} />
        <Experience timeline={experience} />
        <Contact socials={socials} content={content} personal={personal} />
        <Footer personal={personal} />
      </div>
    </main>
  )
}

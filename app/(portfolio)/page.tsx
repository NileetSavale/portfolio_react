export const dynamic = 'force-dynamic'

import { readData } from '@/lib/store'
import Hero        from '@/components/sections/Hero'
import About       from '@/components/sections/About'
import Skills      from '@/components/sections/Skills'
import Projects    from '@/components/sections/Projects'
import Experience  from '@/components/sections/Experience'
import Contact     from '@/components/sections/Contact'
import Footer      from '@/components/sections/Footer'

export default async function Home() {
  const [personal, content, aboutData, socials, skills, projects, experience] = await Promise.all([
    readData<Record<string, unknown>>('personal'),
    readData<Record<string, unknown>>('content'),
    readData<{ tags: string[]; stats: [string,string][] }>('about'),
    readData<Record<string, unknown>[]>('socials'),
    readData<Record<string, unknown>[]>('skills'),
    readData<Record<string, unknown>[]>('projects'),
    readData<Record<string, unknown>[]>('experience'),
  ])

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

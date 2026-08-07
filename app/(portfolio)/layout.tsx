import Preloader       from '@/components/Preloader'
import TopAccent       from '@/components/TopAccent'
import Nav             from '@/components/Nav'
import HudBottom       from '@/components/HudBottom'
import ScrollProgress  from '@/components/ScrollProgress'
import SectionIndicator from '@/components/SectionIndicator'
import FloatingSocials from '@/components/FloatingSocials'

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ScrollProgress />
      <Preloader />
      <TopAccent />
      <Nav />
      <HudBottom />
      <SectionIndicator />
      <FloatingSocials />
      {children}
    </>
  )
}

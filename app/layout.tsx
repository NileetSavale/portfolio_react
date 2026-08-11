import type { Metadata } from 'next'
import { Bebas_Neue, Cinzel, Shippori_Mincho, Space_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import Grain from '@/components/Grain'

const bebas    = Bebas_Neue({    weight: '400',          subsets: ['latin'],    variable: '--f-bebas',    display: 'swap' })
const cinzel   = Cinzel({        weight: ['600','800'],   subsets: ['latin'],    variable: '--f-cinzel',   display: 'swap' })
const shippori = Shippori_Mincho({ weight: ['700','800'], subsets: ['latin'],    variable: '--f-shippori', display: 'swap', preload: false })
const mono     = Space_Mono({    weight: ['400','700'],   subsets: ['latin'],    variable: '--f-mono',     display: 'swap' })

const SITE = 'https://www.nileetsavale.com'
const DESC = 'CS Graduate Student and AI/ML Engineer at Indiana University. Building intelligent systems that bridge research and real-world impact.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: 'Nileet Savale — AI/ML Engineer', template: '%s — Nileet Savale' },
  description: DESC,
  keywords: ['Nileet Savale', 'AI Engineer', 'Machine Learning', 'Indiana University', 'CS Graduate Student', 'Portfolio', 'Software Engineer'],
  authors: [{ name: 'Nileet Savale', url: SITE }],
  creator: 'Nileet Savale',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE,
    siteName: 'Nileet Savale',
    title: 'Nileet Savale — AI/ML Engineer',
    description: DESC,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Nileet Savale — AI/ML Engineer' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nileet Savale — AI/ML Engineer',
    description: DESC,
    creator: '@SavaleNileet',
    images: ['/og.png'],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  icons: { icon: '/logo1.svg' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const fontVars = `${bebas.variable} ${cinzel.variable} ${shippori.variable} ${mono.variable}`
  return (
    <html lang="en" className={fontVars} data-scroll-behavior="smooth">
      <body>
        <Grain />
        {children}
        <Analytics />
      </body>
    </html>
  )
}

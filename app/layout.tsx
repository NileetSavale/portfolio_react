import type { Metadata } from 'next'
import { Bebas_Neue, Cinzel, Shippori_Mincho, Space_Mono } from 'next/font/google'
import './globals.css'
import Grain from '@/components/Grain'

const bebas    = Bebas_Neue({    weight: '400',          subsets: ['latin'],    variable: '--f-bebas',    display: 'swap' })
const cinzel   = Cinzel({        weight: ['600','800'],   subsets: ['latin'],    variable: '--f-cinzel',   display: 'swap' })
const shippori = Shippori_Mincho({ weight: ['700','800'], subsets: ['latin'],    variable: '--f-shippori', display: 'swap', preload: false })
const mono     = Space_Mono({    weight: ['400','700'],   subsets: ['latin'],    variable: '--f-mono',     display: 'swap' })

export const metadata: Metadata = {
  title: 'Nileet Savale — Portfolio',
  description: 'CS Graduate Student · AI/ML Engineer · Indiana University',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const fontVars = `${bebas.variable} ${cinzel.variable} ${shippori.variable} ${mono.variable}`
  return (
    <html lang="en" className={fontVars} data-scroll-behavior="smooth">
      <body>
        <Grain />
        {children}
      </body>
    </html>
  )
}

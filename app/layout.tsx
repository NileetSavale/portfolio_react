import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Merriweather } from "next/font/google"
import "./globals.css"
import { Suspense } from "react"
import FloatingSocialBar from "../components/social-floating-bar"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-merriweather",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Nileet Savale - Portfolio",
  description: "Computer Science Graduate Student | AI/ML Developer | Full-Stack Engineer",
   icons: {
    icon: '/logo1.svg', // or '/your-logo.png'
    apple: '/apple-icon.png',
  } 
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable} ${merriweather.variable}`}>
        <FloatingSocialBar />
        <Suspense>{children}</Suspense>
      </body>
    </html>
  )
}

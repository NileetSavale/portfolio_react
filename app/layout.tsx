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

// ---------- SEO METADATA ----------
export const metadata: Metadata = {
  metadataBase: new URL("https://nileet.dev"),

  title: {
    default: "Nileet Savale - Portfolio",
    template: "%s | Nileet Savale",
  },

  description:
    "Computer Science Graduate Student specializing in AI/ML, Full-Stack Engineering, and Cloud Computing. Explore my projects, skills, and experience.",

  keywords: [
    "Nileet Savale",
    "Portfolio",
    "AI Engineer",
    "Full Stack Developer",
    "Machine Learning",
    "React Developer",
    "Next.js Portfolio",
    "Indiana University",
    "Software Engineer",
    "Developer Portfolio",
  ],

  authors: [{ name: "Nileet Savale" }],
  creator: "Nileet Savale",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nileet.dev",
    title: "Nileet Savale - Portfolio",
    description:
      "AI/ML Developer and Full-Stack Engineer. Explore my work, projects, and experience.",
    siteName: "Nileet Savale Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Nileet Savale Portfolio",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Nileet Savale - Portfolio",
    description:
      "AI/ML Developer • Full-Stack Engineer • Graduate Student at Indiana University Bloomington.",
    images: ["/og-image.png"],
  },

  // ----- Your logo6.svg everywhere -----
  icons: {
    icon: "/logo6.svg",
    shortcut: "/logo6.svg",
    apple: "/logo6.svg",
  },

  alternates: {
    canonical: "https://nileet.dev",
  },
}

// ---------- ROOT LAYOUT ----------
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* JSON-LD Structured Data including your logo */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Nileet Savale",
              jobTitle: "AI/ML Developer & Full-Stack Engineer",
              url: "https://nileet.dev",
              image: "https://nileet.dev/logo6.svg",
              logo: "https://nileet.dev/logo6.svg",
              sameAs: [
                "https://github.com/NileetSavale",
                "https://linkedin.com/in/nileet",
              ],
            }),
          }}
        />
      </head>

      <body className={`font-sans ${inter.variable} ${merriweather.variable}`}>
        <FloatingSocialBar />
        <Suspense>{children}</Suspense>
      </body>
    </html>
  )
}

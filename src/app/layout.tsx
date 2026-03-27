import type { Metadata } from "next"
import "./globals.css"
import { Analytics } from "@/components/analytics"

export const metadata: Metadata = {
  metadataBase: new URL('https://lifeos.ashketing.com'),
  title: 'Life OS — Your Personal Operating System',
  description: 'AI-powered personal OS that tracks every dimension of life and nudges at the right moment.',
  openGraph: {
    title: 'Life OS — Your Personal Operating System',
    description: 'AI-powered personal OS that tracks every dimension of life and nudges at the right moment.',
    url: 'https://lifeos.ashketing.com',
    siteName: 'Life OS',
    images: [{ url: '/images/og-image.png', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Life OS — Your Personal Operating System',
    description: 'AI-powered personal OS that tracks every dimension of life.',
    images: ['/images/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Analytics />
        {children}
      </body>
    </html>
  )
}

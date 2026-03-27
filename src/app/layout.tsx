import type { Metadata } from "next"
import "./globals.css"
import { Analytics } from "@/components/analytics"

export const metadata: Metadata = {
  title: "Meridian — AI-Powered Personal OS",
  description: "The AI-powered OS for builders managing too many things. Watches every dimension of your life, detects drift, and tells you what to focus on today.",
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

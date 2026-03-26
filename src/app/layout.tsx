import type { Metadata } from "next"
import "./globals.css"
import { Analytics } from "@/components/analytics"

export const metadata: Metadata = {
  title: "Life OS — Your Personal Operating System",
  description: "An AI-powered personal OS that tracks every dimension of life, notices drift, and adjusts proactively.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body>
        <Analytics />
        {children}
      </body>
    </html>
  )
}

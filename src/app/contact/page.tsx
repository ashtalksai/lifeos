"use client"

import Link from "next/link"
import { useState } from "react"
import { Send, Check } from "lucide-react"

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full flex items-center justify-between px-6 md:px-8 h-14 backdrop-blur-sm"
      style={{ background: "rgba(10,15,26,0.9)", borderBottom: "1px solid var(--border)" }}>
      <Link href="/">
        <span className="text-base font-bold tracking-[3px]"
          style={{ fontFamily: '"Space Grotesk", sans-serif', color: "var(--accent)" }}>
          MERIDIAN
        </span>
      </Link>
      <Link href="/login" className="px-4 py-2 rounded-[var(--radius-sm)] text-sm font-semibold"
        style={{ background: "var(--accent)", color: "var(--accent-foreground)" }}>
        Get early access
      </Link>
    </nav>
  )
}

function Footer() {
  return (
    <footer style={{ background: "var(--surface)", borderTop: "1px solid var(--border)" }}>
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-base font-bold tracking-[3px]"
            style={{ fontFamily: '"Space Grotesk", sans-serif', color: "var(--accent)" }}>
            MERIDIAN
          </p>
          <div className="flex gap-6">
            {[{ label: "About", href: "/about" }, { label: "Contact", href: "/contact" }, { label: "Privacy", href: "/privacy" }, { label: "Terms", href: "/terms" }].map((item) => (
              <Link key={item.label} href={item.href} className="text-sm hover:text-[var(--text-primary)] transition-colors"
                style={{ color: "var(--text-secondary)" }}>{item.label}</Link>
            ))}
          </div>
          <p className="text-xs" style={{ fontFamily: '"IBM Plex Mono", monospace', color: "var(--text-muted)" }}>
            © 2026 ChimeStream B.V.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default function ContactPage() {
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div style={{ background: "var(--background)", color: "var(--text-primary)" }}>
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 md:px-8 py-20">
        <div className="mb-12">
          <p className="text-xs tracking-widest mb-4"
            style={{ fontFamily: '"IBM Plex Mono", monospace', color: "var(--accent)" }}>
            CONTACT
          </p>
          <h1 className="text-5xl font-bold"
            style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
            Get in touch.
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Form */}
          <div>
            {sent ? (
              <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ background: "var(--accent-muted)", border: "1px solid var(--border-accent)" }}>
                  <Check className="w-6 h-6 text-[var(--accent)]" />
                </div>
                <h3 className="text-xl font-semibold">Message sent.</h3>
                <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                  We&apos;ll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {[
                  { label: "NAME", type: "text", placeholder: "Your name" },
                  { label: "EMAIL", type: "email", placeholder: "you@example.com" },
                ].map((field) => (
                  <div key={field.label}>
                    <label className="text-xs tracking-wider text-[var(--text-muted)] block mb-1.5"
                      style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
                      {field.label}
                    </label>
                    <input type={field.type} placeholder={field.placeholder} required
                      className="w-full px-3 py-2.5 rounded-[var(--radius-sm)] text-sm"
                      style={{
                        background: "var(--surface)",
                        border: "1px solid var(--border)",
                        color: "var(--text-primary)",
                        outline: "none",
                      }} />
                  </div>
                ))}
                <div>
                  <label className="text-xs tracking-wider text-[var(--text-muted)] block mb-1.5"
                    style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
                    SUBJECT
                  </label>
                  <select required className="w-full px-3 py-2.5 rounded-[var(--radius-sm)] text-sm"
                    style={{
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                      color: "var(--text-primary)",
                      outline: "none",
                    }}>
                    <option value="">Select a subject</option>
                    <option>Join the waitlist</option>
                    <option>Product question</option>
                    <option>Bug report</option>
                    <option>Partnership</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs tracking-wider text-[var(--text-muted)] block mb-1.5"
                    style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
                    MESSAGE
                  </label>
                  <textarea required rows={5} placeholder="What's on your mind?"
                    className="w-full px-3 py-2.5 rounded-[var(--radius-sm)] text-sm resize-none"
                    style={{
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                      color: "var(--text-primary)",
                      outline: "none",
                    }} />
                </div>
                <button type="submit"
                  className="flex items-center gap-2 px-6 py-2.5 rounded-[var(--radius-sm)] text-sm font-semibold transition-colors"
                  style={{ background: "var(--accent)", color: "var(--accent-foreground)" }}>
                  <Send className="w-4 h-4" />
                  Send message
                </button>
              </form>
            )}
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div className="p-5 rounded-[var(--radius-md)]"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
              <h3 className="font-semibold mb-3">Response time</h3>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                We typically respond within 24 hours on business days.
              </p>
            </div>
            <div className="p-5 rounded-[var(--radius-md)]"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
              <h3 className="font-semibold mb-2">Email</h3>
              <a href="mailto:hello@chimestream.com"
                className="text-sm text-[var(--accent)] hover:underline"
                style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
                hello@chimestream.com
              </a>
            </div>
            <div className="p-5 rounded-[var(--radius-md)]"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                Meridian is currently in beta — single user instance only. Join the waitlist for early access when we open up to more builders.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

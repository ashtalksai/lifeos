import Link from "next/link"

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full flex items-center justify-between px-6 md:px-8 h-14 backdrop-blur-sm"
      style={{ background: "rgba(10,15,26,0.9)", borderBottom: "1px solid var(--border)" }}>
      <Link href="/">
        <span className="text-base font-bold tracking-[3px]" style={{ fontFamily: '"Space Grotesk", sans-serif', color: "var(--accent)" }}>
          MERIDIAN
        </span>
      </Link>
    </nav>
  )
}

export default function PrivacyPage() {
  return (
    <div style={{ background: "var(--background)", color: "var(--text-primary)" }}>
      <Navbar />
      <main className="max-w-3xl mx-auto px-6 md:px-8 py-16 space-y-8">
        <div>
          <p className="text-xs mb-2" style={{ fontFamily: '"IBM Plex Mono", monospace', color: "var(--text-muted)" }}>
            Last updated: March 27, 2026
          </p>
          <h1 className="text-4xl font-bold" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
            Privacy Policy
          </h1>
        </div>

        {[
          {
            h: "1. What we collect",
            p: "Meridian collects: your email address and name (for authentication), daily check-in data you provide (gym, sleep, energy, mood), habit tracking data, goal definitions and progress, and data automatically pulled from connected integrations (Trello, Simplicate). We do not collect payment information in Phase 1.",
          },
          {
            h: "2. How we use your data",
            p: "Your data is used exclusively to power the Meridian dashboard and AI brief generation. Claude API calls receive anonymized context to generate your morning brief — no identifying information is included in prompts. We never sell, rent, or share your personal data with third parties.",
          },
          {
            h: "3. Data storage",
            p: "All data is stored in a PostgreSQL database hosted on our server infrastructure (Coolify on Hetzner Cloud). Data is encrypted at rest and in transit (TLS). Daily backups are made to Cloudflare R2.",
          },
          {
            h: "4. Third-party integrations",
            p: "When you connect Trello or Simplicate, we store OAuth tokens to pull your data. We only read data — we never write to or modify your connected tools. You can revoke access at any time from Settings → Connections.",
          },
          {
            h: "5. AI and Claude",
            p: "We use Anthropic's Claude API to generate your morning brief and pattern analysis. Prompts are ephemeral — Anthropic does not store conversation history from API calls. Your raw data never leaves our servers; only processed, anonymized summaries are sent to Claude.",
          },
          {
            h: "6. Data deletion",
            p: "You can delete your account and all associated data at any time from Settings → Account → Danger Zone. Deletion is permanent and cannot be undone. We complete deletion within 7 days of request.",
          },
          {
            h: "7. Cookies",
            p: "We use session cookies for authentication (NextAuth.js). No tracking cookies, no advertising pixels, no analytics beyond basic server logs.",
          },
          {
            h: "8. Contact",
            p: "For privacy questions: hello@chimestream.com. We respond within 72 hours.",
          },
        ].map((section) => (
          <div key={section.h}>
            <h2 className="text-2xl font-semibold mb-3" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
              {section.h}
            </h2>
            <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)", lineHeight: "1.8" }}>
              {section.p}
            </p>
          </div>
        ))}
      </main>
    </div>
  )
}

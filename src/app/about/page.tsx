import Link from "next/link"
import { ArrowRight } from "lucide-react"

function Navbar() {
  return (
    <nav
      className="sticky top-0 z-50 w-full flex items-center justify-between px-6 md:px-8 h-14 backdrop-blur-sm"
      style={{ background: "rgba(10,15,26,0.9)", borderBottom: "1px solid var(--border)" }}
    >
      <Link href="/">
        <span className="text-base font-bold tracking-[3px]"
          style={{ fontFamily: '"Space Grotesk", sans-serif', color: "var(--accent)" }}>
          MERIDIAN
        </span>
      </Link>
      <Link href="/login"
        className="px-4 py-2 rounded-[var(--radius-sm)] text-sm font-semibold transition-colors"
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
            {[
              { label: "About", href: "/about" },
              { label: "Contact", href: "/contact" },
              { label: "Privacy", href: "/privacy" },
              { label: "Terms", href: "/terms" },
            ].map((item) => (
              <Link key={item.label} href={item.href}
                className="text-sm transition-colors hover:text-[var(--text-primary)]"
                style={{ color: "var(--text-secondary)" }}>
                {item.label}
              </Link>
            ))}
          </div>
          <p className="text-xs" style={{ fontFamily: '"IBM Plex Mono", monospace', color: "var(--text-muted)" }}>
            © 2026 ChimeStream B.V.
          </p>
        </div>
        <p className="text-xs text-center mt-4"
          style={{ fontFamily: '"IBM Plex Mono", monospace', color: "var(--text-muted)" }}>
          Built by Ash Hatef · Rotterdam, Netherlands
        </p>
      </div>
    </footer>
  )
}

export default function AboutPage() {
  return (
    <div style={{ background: "var(--background)", color: "var(--text-primary)" }}>
      <Navbar />

      <main className="max-w-3xl mx-auto px-6 md:px-8 py-20 space-y-16">
        {/* Hero */}
        <div>
          <p className="text-xs tracking-widest mb-4"
            style={{ fontFamily: '"IBM Plex Mono", monospace', color: "var(--accent)" }}>
            THE STORY
          </p>
          <h1 className="text-5xl md:text-6xl font-bold leading-[1.1]"
            style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
            I built this because I was drowning in tools.
          </h1>
        </div>

        {/* Mission */}
        <div
          className="p-6 rounded-[var(--radius-md)]"
          style={{
            background: "var(--surface)",
            borderLeft: "2px solid var(--accent)",
            border: "1px solid var(--border)",
          }}
        >
          <p className="text-lg leading-relaxed italic" style={{ color: "var(--text-secondary)" }}>
            &quot;To give every ambitious builder the operational clarity of a world-class CEO — without the team to support it.&quot;
          </p>
        </div>

        {/* Body */}
        <div className="prose max-w-none space-y-4">
          <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            I had Notion. I had Exist.io. I had habit trackers, goal trackers, a Trello board for work,
            a spreadsheet for money. Each one did one thing okay. None of them talked to each other.
            None of them noticed when I was drifting.
          </p>
          <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            The insight that changed everything: the best tools don&apos;t wait for you to fill them in.
            They work while you sleep. They notice what you can&apos;t. They tell you what matters when
            you wake up.
          </p>
          <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            So I built Meridian. Not a productivity app. Not a habit tracker. An operating system —
            one that connects every dimension of life and surfaces the signal in the noise.
          </p>
        </div>

        {/* Three differentiators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: "Works while you sleep",
              body: "Claude runs at 2am. Pattern analysis, data aggregation, brief generation — done before you open your eyes.",
            },
            {
              title: "Connects dimensions",
              body: "Health, money, work, goals. One screen. The system sees the correlations you can't.",
            },
            {
              title: "Built on science",
              body: "BJ Fogg's Tiny Habits for behavior design. Implementation intentions for goal setting. Not intuition — research.",
            },
          ].map((card) => (
            <div key={card.title}
              className="p-5 rounded-[var(--radius-md)]"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
              <h3 className="font-semibold mb-2">{card.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {card.body}
              </p>
            </div>
          ))}
        </div>

        {/* Builder */}
        <div className="flex items-start gap-5">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 text-2xl"
            style={{ background: "var(--surface-elevated)", border: "2px solid var(--accent)" }}
          >
            A
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-1">Ash Hatef</h3>
            <p className="text-sm mb-3" style={{ color: "var(--text-muted)", fontFamily: '"IBM Plex Mono", monospace' }}>
              Founder, Stravix & ChimeStream · Rotterdam, Netherlands
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              AI automation specialist and serial builder. Building Stravix (AI content for SMBs),
              running Gradient AI consulting, and building the tools I wish existed.
              Meridian is personal — I use it every day.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-8">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-[var(--radius-sm)] text-base font-semibold transition-colors"
            style={{ background: "var(--accent)", color: "var(--accent-foreground)" }}
          >
            Try it for free
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}

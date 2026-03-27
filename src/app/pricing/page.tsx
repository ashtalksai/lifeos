import Link from "next/link"
import { ArrowRight, ChevronDown } from "lucide-react"

function Navbar() {
  return (
    <nav
      className="sticky top-0 z-50 w-full flex items-center justify-between px-6 md:px-8 h-14 backdrop-blur-sm"
      style={{
        background: "rgba(10,15,26,0.9)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <Link
        href="/"
        className="text-base font-bold tracking-[3px]"
        style={{ fontFamily: '"Space Grotesk", sans-serif', color: "var(--accent)" }}
      >
        MERIDIAN
      </Link>
      <div className="hidden md:flex items-center gap-6">
        {["How it Works", "Pricing", "About"].map((item) => (
          <Link
            key={item}
            href={item === "Pricing" ? "/pricing" : `/#${item.toLowerCase().replace(/\s/g, "-")}`}
            className="text-sm transition-colors"
            style={{ color: "var(--text-secondary)" }}
          >
            {item}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <Link
          href="/login"
          className="text-sm transition-colors"
          style={{ color: "var(--text-secondary)" }}
        >
          Log in
        </Link>
        <Link
          href="/login"
          className="px-4 py-2 rounded-[var(--radius-sm)] text-sm font-semibold transition-colors"
          style={{ background: "var(--accent)", color: "var(--accent-foreground)" }}
        >
          Get early access
        </Link>
      </div>
    </nav>
  )
}

function PricingCard({
  label,
  name,
  price,
  desc,
  features,
  cta,
  primary,
}: {
  label: string
  name: string
  price: string
  desc: string
  features: Array<{ text: string; on: boolean }>
  cta: string
  primary: boolean
}) {
  return (
    <div
      className="relative p-6 rounded-[var(--radius-lg)]"
      style={{
        background: "var(--surface)",
        border: `1px solid ${primary ? "var(--accent)" : "var(--border)"}`,
        boxShadow: primary ? "var(--shadow-accent)" : "none",
      }}
    >
      <p
        className="text-[10px] tracking-wider mb-4"
        style={{
          fontFamily: '"IBM Plex Mono", monospace',
          color: primary ? "var(--accent)" : "var(--text-muted)",
          background: primary ? "var(--accent-muted)" : "transparent",
          border: primary ? "1px solid var(--border-accent)" : "none",
          display: "inline-block",
          padding: primary ? "2px 8px" : "0",
          borderRadius: "var(--radius-sm)",
        }}
      >
        {label}
      </p>
      <h3 className="text-2xl font-bold mb-1">{name}</h3>
      <p
        className="text-3xl font-bold mb-3"
        style={{ fontFamily: '"IBM Plex Mono", monospace', color: "var(--accent)" }}
      >
        {price}
      </p>
      <p className="text-sm mb-5" style={{ color: "var(--text-secondary)" }}>
        {desc}
      </p>
      <div className="space-y-2 mb-6">
        {features.map((f) => (
          <div key={f.text} className="flex items-center gap-2">
            <span style={{ color: f.on ? "var(--success)" : "var(--text-muted)" }}>
              {f.on ? "✓" : "✗"}
            </span>
            <span className="text-sm" style={{ color: f.on ? "var(--text-secondary)" : "var(--text-muted)" }}>
              {f.text}
            </span>
          </div>
        ))}
      </div>
      <Link
        href="/login"
        className="block w-full text-center py-2.5 rounded-[var(--radius-sm)] text-sm font-semibold transition-colors"
        style={{
          background: primary ? "var(--accent)" : "transparent",
          color: primary ? "var(--accent-foreground)" : "var(--accent)",
          border: `1px solid ${primary ? "var(--accent)" : "var(--border-accent)"}`,
        }}
      >
        {cta}
      </Link>
    </div>
  )
}

export default function PricingPage() {
  const plans = [
    {
      label: "FREE FOREVER",
      name: "Explorer",
      price: "$0",
      desc: "Try the core before you commit.",
      features: [
        { text: "3 dimensions", on: true },
        { text: "5 habits", on: true },
        { text: "Daily check-in", on: true },
        { text: "AI brief", on: false },
        { text: "Pattern detection", on: false },
        { text: "Data feeds", on: false },
      ],
      cta: "Start free",
      primary: false,
    },
    {
      label: "MOST POPULAR",
      name: "Builder",
      price: "$15/mo",
      desc: "For builders serious about operating at full capacity.",
      features: [
        { text: "All 6 dimensions", on: true },
        { text: "AI morning brief", on: true },
        { text: "Pattern detection", on: true },
        { text: "Unlimited habits", on: true },
        { text: "Trello + Simplicate feeds", on: true },
      ],
      cta: "Start Builder",
      primary: true,
    },
    {
      label: "MAXIMUM CLARITY",
      name: "Operator",
      price: "$29/mo",
      desc: "Maximum operational clarity.",
      features: [
        { text: "Everything in Builder", on: true },
        { text: "Telegram nudges", on: true },
        { text: "Weekly AI deep review", on: true },
        { text: "Custom data feeds", on: true },
        { text: "Priority support", on: true },
      ],
      cta: "Start Operator",
      primary: false,
    },
  ]

  const faqs = [
    {
      q: "How is this different from Notion Life OS?",
      a: "Notion Life OS is passive — you fill it in. Meridian is active — it reads your data, analyzes patterns, and tells you what matters. You don't maintain it; it works for you.",
    },
    {
      q: "What data do you connect?",
      a: "Currently: Trello (work pipeline) and Simplicate (time tracking). More coming: GitHub, Asana, Google Calendar. You also provide a daily 10-second check-in for health data.",
    },
    {
      q: "Is my data safe?",
      a: "All data lives in your own database instance (shared Postgres on our Coolify server). We never sell or share your data. Claude API calls are ephemeral — nothing is stored by Anthropic.",
    },
    {
      q: "Do I need to be technical to use this?",
      a: "Not at all. OAuth connections (click a button), 3-field baseline setup, and a daily check-in. That's it. The complexity is handled by the system.",
    },
    {
      q: "What if I miss a day?",
      a: "Your streak resets (it's meant to hurt a little — that's the motivation). But you can enable 'streak insurance' per habit to allow one grace day per week before reset.",
    },
    {
      q: "Can I use this for my team?",
      a: "Phase 1 is single-user. Multi-user is Phase 5 on the roadmap. If you're interested, join the waitlist and we'll notify you when team access is available.",
    },
  ]

  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--background)", color: "var(--text-primary)" }}
    >
      <Navbar />

      {/* Hero */}
      <section
        id="pricing-hero"
        className="relative min-h-[50vh] flex items-center overflow-hidden py-20"
      >
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute inset-0 glow-teal" />

        <div className="relative w-full max-w-5xl mx-auto px-6 md:px-8">
          <p
            className="text-xs tracking-widest text-center mb-4"
            style={{ fontFamily: '"IBM Plex Mono", monospace', color: "var(--accent)" }}
          >
            PRICING
          </p>
          <h1
            className="text-5xl md:text-6xl font-bold text-center mb-6"
            style={{ fontFamily: '"Space Grotesk", sans-serif' }}
          >
            One price. Your entire life.
          </h1>
          <p
            className="text-lg text-center max-w-2xl mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            Choose the plan that fits your life. All plans include the core
            features you need to operate at full capacity.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20" style={{ background: "var(--background)" }}>
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {plans.map((plan) => (
              <PricingCard
                key={plan.name}
                label={plan.label}
                name={plan.name}
                price={plan.price}
                desc={plan.desc}
                features={plan.features}
                cta={plan.cta}
                primary={plan.primary}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-20" style={{ background: "var(--surface)" }}>
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          <h2
            className="text-4xl font-bold text-center mb-12"
            style={{ fontFamily: '"Space Grotesk", sans-serif' }}
          >
            Detailed comparison
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  <th
                    className="px-4 py-4 text-left font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Feature
                  </th>
                  <th
                    className="px-4 py-4 text-center font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Explorer
                  </th>
                  <th
                    className="px-4 py-4 text-center font-semibold"
                    style={{ color: "var(--accent)" }}
                  >
                    Builder
                  </th>
                  <th
                    className="px-4 py-4 text-center font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Operator
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: "Life dimensions tracked", explorer: "3", builder: "6", operator: "6" },
                  {
                    feature: "Habits per dimension",
                    explorer: "5 total",
                    builder: "Unlimited",
                    operator: "Unlimited",
                  },
                  { feature: "Daily check-in", explorer: "✓", builder: "✓", operator: "✓" },
                  { feature: "AI morning brief", explorer: "✗", builder: "✓", operator: "✓" },
                  {
                    feature: "Pattern detection",
                    explorer: "✗",
                    builder: "✓",
                    operator: "✓",
                  },
                  {
                    feature: "Data feed integrations",
                    explorer: "✗",
                    builder: "2 (Trello, Simplicate)",
                    operator: "Custom",
                  },
                  {
                    feature: "Weekly deep review",
                    explorer: "✗",
                    builder: "✗",
                    operator: "✓",
                  },
                  {
                    feature: "Telegram nudges",
                    explorer: "✗",
                    builder: "✗",
                    operator: "✓",
                  },
                  {
                    feature: "Priority support",
                    explorer: "✗",
                    builder: "✗",
                    operator: "✓",
                  },
                  {
                    feature: "Export data",
                    explorer: "✓",
                    builder: "✓",
                    operator: "✓",
                  },
                ].map((row, i) => (
                  <tr
                    key={i}
                    style={{
                      borderBottom: "1px solid var(--border)",
                      background: i % 2 === 0 ? "transparent" : "var(--surface-hover)",
                    }}
                  >
                    <td
                      className="px-4 py-4 font-medium"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {row.feature}
                    </td>
                    <td
                      className="px-4 py-4 text-center"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {row.explorer}
                    </td>
                    <td
                      className="px-4 py-4 text-center"
                      style={{ color: "var(--accent)" }}
                    >
                      {row.builder}
                    </td>
                    <td
                      className="px-4 py-4 text-center"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {row.operator}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20" style={{ background: "var(--background)" }}>
        <div className="max-w-3xl mx-auto px-6 md:px-8">
          <h2
            className="text-4xl font-bold mb-12"
            style={{ fontFamily: '"Space Grotesk", sans-serif' }}
          >
            Questions.
          </h2>
          <div className="space-y-0">
            {faqs.map((item, i) => (
              <details
                key={i}
                className="group border-t"
                style={{ borderColor: "var(--border)" }}
              >
                <summary
                  className="flex items-center justify-between w-full py-5 text-base font-semibold cursor-pointer list-none"
                  style={{ color: "var(--text-primary)" }}
                >
                  {item.q}
                  <ChevronDown
                    className="w-5 h-5 flex-shrink-0 group-open:rotate-180 transition-transform"
                    style={{ color: "var(--accent)" }}
                  />
                </summary>
                <p
                  className="pb-5 text-sm leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {item.a}
                </p>
              </details>
            ))}
            <div className="border-t" style={{ borderColor: "var(--border)" }} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="relative py-24 overflow-hidden"
        style={{ background: "var(--surface)" }}
      >
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute inset-0 glow-teal" />
        <div className="relative max-w-3xl mx-auto px-6 md:px-8 text-center">
          <p
            className="text-xs tracking-widest mb-4"
            style={{ fontFamily: '"IBM Plex Mono", monospace', color: "var(--accent)" }}
          >
            READY TO GET STARTED?
          </p>
          <h2
            className="text-5xl md:text-6xl font-bold mb-6"
            style={{ fontFamily: '"Space Grotesk", sans-serif' }}
          >
            Join the waitlist.
          </h2>
          <p className="text-xl mb-10" style={{ color: "var(--text-secondary)" }}>
            All plans start with a 14-day free trial. No credit card required.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-[var(--radius-sm)] text-lg font-semibold transition-colors"
            style={{ background: "var(--accent)", color: "var(--accent-foreground)" }}
          >
            Get early access
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: "var(--background)", borderTop: "1px solid var(--border)" }}>
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <p
                className="text-lg font-bold tracking-[3px] mb-3"
                style={{
                  fontFamily: '"Space Grotesk", sans-serif',
                  color: "var(--accent)",
                }}
              >
                MERIDIAN
              </p>
              <p className="text-sm leading-relaxed mb-2" style={{ color: "var(--text-muted)" }}>
                The AI-powered OS for people who operate at scale.
              </p>
              <p
                className="text-xs"
                style={{ fontFamily: '"IBM Plex Mono", monospace', color: "var(--text-muted)" }}
              >
                © 2026 ChimeStream B.V.
              </p>
            </div>
            <div>
              <p
                className="text-xs tracking-wider text-[var(--text-muted)] mb-3"
                style={{ fontFamily: '"IBM Plex Mono", monospace' }}
              >
                PRODUCT
              </p>
              <div className="space-y-2">
                {["Dashboard", "Goals", "Habits", "Health", "Money", "Work"].map((item) => (
                  <Link
                    key={item}
                    href="/login"
                    className="block text-sm transition-colors hover:text-[var(--text-primary)]"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p
                className="text-xs tracking-wider text-[var(--text-muted)] mb-3"
                style={{ fontFamily: '"IBM Plex Mono", monospace' }}
              >
                COMPANY
              </p>
              <div className="space-y-2">
                {[
                  { label: "About", href: "/about" },
                  { label: "Contact", href: "/contact" },
                  { label: "Privacy Policy", href: "/privacy" },
                  { label: "Terms of Service", href: "/terms" },
                ].map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="block text-sm transition-colors hover:text-[var(--text-primary)]"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="pt-6 border-t" style={{ borderColor: "var(--border)" }}>
            <p
              className="text-xs text-center"
              style={{ fontFamily: '"IBM Plex Mono", monospace', color: "var(--text-muted)" }}
            >
              Built by Ash Hatef · Rotterdam, Netherlands
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

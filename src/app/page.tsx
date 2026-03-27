import Link from "next/link"
import {
  Brain,
  GitBranch,
  LayoutGrid,
  Cable,
  Flame,
  Target,
  Plug,
  Settings2,
  CheckCircle,
  Sunrise,
  Zap,
  Database,
  TrendingDown,
  ArrowRight,
  ChevronDown,
} from "lucide-react"

// ── Landing page (Phase 5 skeleton — Phase 1: unauthenticated visitors) ──

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center px-3 py-1 rounded-full text-xs border"
      style={{
        fontFamily: '"IBM Plex Mono", monospace',
        color: "var(--accent)",
        borderColor: "var(--border-accent)",
        background: "var(--accent-muted)",
        letterSpacing: "0.05em",
      }}
    >
      {children}
    </span>
  )
}

function Navbar() {
  return (
    <nav
      className="sticky top-0 z-50 w-full flex items-center justify-between px-6 md:px-8 h-14 backdrop-blur-sm"
      style={{
        background: "rgba(10,15,26,0.9)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <span
        className="text-base font-bold tracking-[3px]"
        style={{ fontFamily: '"Space Grotesk", sans-serif', color: "var(--accent)" }}
      >
        MERIDIAN
      </span>
      <div className="hidden md:flex items-center gap-6">
        {["How it Works", "Pricing", "About"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase().replace(/\s/g, "-")}`}
            className="text-sm transition-colors"
            style={{ color: "var(--text-secondary)", fontFamily: '"Space Grotesk", sans-serif' }}
          >
            {item}
          </a>
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

// Mock dashboard preview
function DashboardPreview() {
  return (
    <div
      className="relative rounded-[var(--radius-lg)] overflow-hidden"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(0,212,200,0.08)",
      }}
    >
      {/* Browser chrome */}
      <div
        className="flex items-center gap-2 px-4 py-3 border-b"
        style={{ background: "var(--surface-elevated)", borderColor: "var(--border)" }}
      >
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ef4444] opacity-70" />
          <div className="w-3 h-3 rounded-full bg-[#f59e0b] opacity-70" />
          <div className="w-3 h-3 rounded-full bg-[#22c55e] opacity-70" />
        </div>
        <div
          className="flex-1 h-5 rounded-[2px] mx-8 flex items-center px-2 text-xs text-[var(--text-muted)]"
          style={{ background: "var(--surface)", fontFamily: '"IBM Plex Mono", monospace' }}
        >
          lifeos.ashketing.com/dashboard
        </div>
      </div>

      {/* AI brief mock */}
      <div className="p-4 space-y-3">
        <div
          className="rounded-[var(--radius-sm)] p-3"
          style={{ background: "var(--background)", border: "1px solid var(--border-accent)", borderLeft: "2px solid var(--accent)" }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] tracking-wider text-[var(--text-muted)]"
              style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
              AI BRIEF
            </span>
            <span className="text-[10px] text-[var(--text-secondary)]"
              style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
              Generated 7:04am
            </span>
          </div>
          <p className="text-xs text-[var(--text-primary)] leading-relaxed">
            You&apos;ve logged gym 4 of the last 5 days — strong. Gradient sprint ends Friday; 6h logged vs 12h target, needs catch-up. Stravix pipeline has 3 cards in Doing — none stuck.
          </p>
        </div>

        {/* Bento mini grid */}
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "WORK", value: "4 cards", sub: "Doing on Trello" },
            { label: "HEALTH", value: "🔥 Gym done", sub: "7.5h sleep" },
            { label: "MONEY", value: "€47,200", sub: "↓ €320 this month" },
            { label: "GOALS", value: "3 active", sub: "68% avg progress" },
          ].map((w) => (
            <div key={w.label}
              className="rounded-[var(--radius-sm)] p-2"
              style={{ background: "var(--background)", border: "1px solid var(--border)" }}>
              <p className="text-[9px] tracking-wider text-[var(--text-muted)] mb-1"
                style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
                {w.label}
              </p>
              <p className="text-xs font-bold text-[var(--accent)]"
                style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
                {w.value}
              </p>
              <p className="text-[10px] text-[var(--text-muted)]">{w.sub}</p>
            </div>
          ))}
        </div>

        {/* Habit strip */}
        <div className="flex gap-2">
          {["GYM", "READ", "SLEEP", "H2O"].map((h) => (
            <div key={h} className="flex flex-col items-center gap-1">
              <div className="w-8 h-8 rounded-full flex items-center justify-center border"
                style={{ background: h === "GYM" ? "var(--accent)" : "var(--background)", borderColor: h === "GYM" ? "var(--accent)" : "var(--border)" }}>
                <span className="text-[10px] font-bold"
                  style={{ fontFamily: '"IBM Plex Mono", monospace', color: h === "GYM" ? "var(--accent-foreground)" : "var(--text-muted)" }}>
                  {h === "GYM" ? "✓" : "–"}
                </span>
              </div>
              <span className="text-[8px] text-[var(--text-muted)]" style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
                {h}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function LandingPage() {
  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--background)", color: "var(--text-primary)" }}
    >
      <Navbar />

      {/* Hero */}
      <section
        id="hero"
        className="relative min-h-[90vh] flex items-center overflow-hidden"
      >
        {/* Grid dots */}
        <div className="absolute inset-0 bg-grid opacity-30" />
        {/* Teal glow */}
        <div className="absolute inset-0 glow-teal" />

        <div className="relative w-full max-w-7xl mx-auto px-6 md:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div className="space-y-6">
              <Badge>EARLY ACCESS</Badge>

              <h1
                className="text-5xl md:text-7xl font-bold leading-[1.05]"
                style={{ fontFamily: '"Space Grotesk", sans-serif', color: "var(--text-primary)" }}
              >
                Your life, finally running at full capacity.
              </h1>

              <p className="text-lg md:text-xl max-w-lg leading-relaxed"
                style={{ color: "var(--text-secondary)" }}>
                Meridian is the AI-powered OS for builders managing too many things.
                It watches every dimension of your life, detects drift before it
                becomes a problem, and tells you what to focus on today.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-[var(--radius-sm)] text-base font-semibold transition-colors"
                  style={{ background: "var(--accent)", color: "var(--accent-foreground)" }}
                >
                  Get early access
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-[var(--radius-sm)] text-base font-medium border transition-colors"
                  style={{ borderColor: "var(--border-accent)", color: "var(--accent)" }}
                >
                  See how it works
                </a>
              </div>
            </div>

            {/* Right — dashboard preview */}
            <div className="lg:block">
              <DashboardPreview />
            </div>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section
        id="problem"
        className="py-20"
        style={{ background: "var(--surface)" }}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4"
              style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
              You&apos;re managing your life in a dozen disconnected places.
            </h2>
            <p className="text-lg"
              style={{ color: "var(--text-secondary)" }}>
              Sound familiar?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: Zap,
                title: "The pattern you keep missing",
                body: "Your gym habit runs strong — until Gradient sprint week. Then 10 days disappear. You notice too late, three weeks in, after the damage is done.",
              },
              {
                icon: Database,
                title: "The system you maintain more than you use",
                body: "Your Notion setup took three weeks to build. You spend more time maintaining it than getting value from it. A productivity tool disguised as procrastination.",
              },
              {
                icon: TrendingDown,
                title: "The numbers you avoid",
                body: "You know you should track your debt paydown. You also know what happened last time you opened that spreadsheet. Nothing changed.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="p-6 rounded-[var(--radius-md)]"
                style={{ background: "var(--background)", border: "1px solid var(--border)" }}
              >
                <card.icon className="w-6 h-6 mb-4" style={{ color: "var(--destructive)" }} />
                <h3 className="text-lg font-semibold mb-3">{card.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution */}
      <section
        id="solution"
        className="py-20"
        style={{ background: "var(--background)" }}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p
                className="text-xs tracking-widest"
                style={{ fontFamily: '"IBM Plex Mono", monospace', color: "var(--accent)" }}
              >
                THE MERIDIAN APPROACH
              </p>
              <h2 className="text-4xl md:text-5xl font-bold"
                style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                One system that actually watches your back.
              </h2>
              <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                Meridian connects to your real data — Trello, time tracking — and pairs it
                with your daily 10-second check-in. Claude analyzes everything at 2am.
                Your morning brief is ready before you wake up.
              </p>
              <div className="space-y-3">
                {[
                  "Automatic data pulls — no manual entry for your work pipeline",
                  "Overnight analysis — Claude runs while you sleep",
                  "10-second input — the only thing you have to do each day",
                ].map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <span className="text-[var(--accent)] mt-0.5 font-bold flex-shrink-0">✦</span>
                    <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{point}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <DashboardPreview />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="py-20"
        style={{ background: "var(--surface)" }}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12"
            style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
            Built for people running multiple things at once.
          </h2>

          {/* Asymmetric bento */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 p-6 rounded-[var(--radius-md)]"
                style={{ background: "var(--background)", border: "1px solid var(--border)" }}>
                <Brain className="w-7 h-7 mb-4" style={{ color: "var(--accent)" }} />
                <h3 className="text-xl font-semibold mb-3">AI Morning Brief</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
                  Three sentences waiting at 7am. What matters today, what&apos;s drifting, what to focus on. No fluff — the system did the thinking while you slept.
                </p>
                {/* Mini brief */}
                <div className="rounded-[var(--radius-sm)] p-3"
                  style={{ background: "var(--surface)", border: "1px solid var(--border-accent)", borderLeft: "2px solid var(--accent)" }}>
                  <p className="text-xs text-[var(--text-muted)] mb-1" style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
                    Generated 7:04am
                  </p>
                  <p className="text-xs text-[var(--text-primary)]">
                    You&apos;ve logged gym 4 of the last 5 days — strong. Sprint ends Friday; 6h logged vs 12h target, needs catch-up.
                  </p>
                </div>
              </div>
              <div className="p-6 rounded-[var(--radius-md)]"
                style={{ background: "var(--background)", border: "1px solid var(--border)" }}>
                <GitBranch className="w-7 h-7 mb-4" style={{ color: "var(--accent)" }} />
                <h3 className="text-xl font-semibold mb-3">Pattern Detection</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  &quot;You skip gym when your sprint is active (7/8 times).&quot; The system notices so you don&apos;t have to.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-6 rounded-[var(--radius-md)]"
                style={{ background: "var(--background)", border: "1px solid var(--border)" }}>
                <LayoutGrid className="w-7 h-7 mb-4" style={{ color: "var(--accent)" }} />
                <h3 className="text-xl font-semibold mb-3">Multi-Dimensional</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  Health, money, work, goals, personal. One screen. Not five apps.
                </p>
              </div>
              <div className="md:col-span-2 p-6 rounded-[var(--radius-md)]"
                style={{ background: "var(--background)", border: "1px solid var(--border)" }}>
                <Cable className="w-7 h-7 mb-4" style={{ color: "var(--accent)" }} />
                <h3 className="text-xl font-semibold mb-3">Real Data Feeds</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
                  Trello and Simplicate connect directly. Stop copy-pasting pipeline status into your dashboard.
                </p>
                <div className="flex gap-2">
                  {["Trello", "Simplicate", "GitHub (soon)"].map((tool) => (
                    <span key={tool}
                      className="px-3 py-1 rounded-[var(--radius-sm)] text-xs"
                      style={{
                        background: "var(--surface)",
                        border: "1px solid var(--border)",
                        color: "var(--text-secondary)",
                        fontFamily: '"IBM Plex Mono", monospace',
                      }}>
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-6 rounded-[var(--radius-md)]"
                style={{ background: "var(--background)", border: "1px solid var(--border)" }}>
                <Flame className="w-7 h-7 mb-4" style={{ color: "var(--accent)" }} />
                <h3 className="text-xl font-semibold mb-3">Habit Streaks With Science</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  Built on BJ Fogg&apos;s Tiny Habits. Not just a checkbox — anchored to moments that already exist in your day.
                </p>
              </div>
              <div className="p-6 rounded-[var(--radius-md)]"
                style={{ background: "var(--background)", border: "1px solid var(--border)" }}>
                <Target className="w-7 h-7 mb-4" style={{ color: "var(--accent)" }} />
                <h3 className="text-xl font-semibold mb-3">Goal Hierarchy</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  30yr → 5yr → 1yr → Quarter → Week. Your goals actually connect to your daily actions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20" style={{ background: "var(--background)" }}>
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <p className="text-xs tracking-widest text-center mb-4"
            style={{ fontFamily: '"IBM Plex Mono", monospace', color: "var(--accent)" }}>
            SETUP
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12"
            style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
            Up and running in 5 minutes.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                num: "01",
                icon: Plug,
                title: "Connect your tools",
                body: "Link Trello and Simplicate. Your pipeline and work hours appear automatically.",
              },
              {
                num: "02",
                icon: Settings2,
                title: "Set your baseline",
                body: "Add monthly income, debt total, and daily habits you want to track. 3 minutes.",
              },
              {
                num: "03",
                icon: CheckCircle,
                title: "Check in for 10 seconds",
                body: "Every morning: gym? sleep hours? energy? Five taps. The system handles everything else.",
              },
              {
                num: "04",
                icon: Sunrise,
                title: "Wake up to clarity",
                body: "Claude runs at 2am. Your brief is ready before you open your eyes.",
              },
            ].map((step, i) => (
              <div key={step.num} className="relative">
                {i < 3 && (
                  <div className="absolute top-6 left-full w-full border-t border-dashed hidden md:block"
                    style={{ borderColor: "var(--border-accent)", width: "100%", left: "100%", transform: "translateX(-50%)" }} />
                )}
                <div
                  className="p-5 rounded-[var(--radius-md)]"
                  style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
                >
                  <p
                    className="text-4xl font-bold mb-3 select-none"
                    style={{ fontFamily: '"IBM Plex Mono", monospace', color: "rgba(0,212,200,0.15)" }}
                  >
                    {step.num}
                  </p>
                  <step.icon className="w-6 h-6 mb-3" style={{ color: "var(--accent)" }} />
                  <h3 className="font-semibold text-base mb-2">{step.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20" style={{ background: "var(--surface)" }}>
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <h2 className="text-3xl font-bold text-center mb-12"
            style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
            Built by a founder, for founders.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                quote: "I tried Notion, Exist.io, and three different habit apps. Meridian is the first thing that actually sticks because it does the work instead of making me do more work.",
                attr: "Solo founder, bootstrapped SaaS",
              },
              {
                quote: "The pattern detection alone is worth it. I had no idea my sleep was correlated with skipping lunch. Now I know, and I plan around it.",
                attr: "Indie hacker, 3 income streams",
              },
              {
                isStats: true,
              },
            ].map((card, i) => (
              <div
                key={i}
                className="p-6 rounded-[var(--radius-md)]"
                style={{ background: "var(--background)", border: "1px solid var(--border)" }}
              >
                {(card as { isStats?: boolean }).isStats ? (
                  <div className="text-center py-4">
                    <p
                      className="text-6xl font-bold mb-3"
                      style={{ fontFamily: '"IBM Plex Mono", monospace', color: "var(--accent)" }}
                    >
                      2.3×
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                      improvement in daily goal completion after 30 days
                    </p>
                    <p className="text-xs mt-2" style={{ fontFamily: '"IBM Plex Mono", monospace', color: "var(--text-muted)" }}>
                      (Beta user average)
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="flex gap-1.5 mb-4">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <div key={n} className="w-3 h-3 rounded-full" style={{ background: "var(--accent)" }} />
                      ))}
                    </div>
                    <p className="text-sm leading-relaxed mb-4 italic" style={{ color: "var(--text-secondary)" }}>
                      &quot;{(card as { quote: string }).quote}&quot;
                    </p>
                    <p className="text-xs" style={{ fontFamily: '"IBM Plex Mono", monospace', color: "var(--text-muted)" }}>
                      — {(card as { attr: string }).attr}
                    </p>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20" style={{ background: "var(--background)" }}>
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          <p className="text-xs tracking-widest text-center mb-4"
            style={{ fontFamily: '"IBM Plex Mono", monospace', color: "var(--accent)" }}>
            PRICING
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12"
            style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
            One price. Your entire life.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
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
            ].map((plan) => (
              <div
                key={plan.name}
                className="relative p-6 rounded-[var(--radius-lg)]"
                style={{
                  background: "var(--surface)",
                  border: `1px solid ${plan.primary ? "var(--accent)" : "var(--border)"}`,
                  boxShadow: plan.primary ? "var(--shadow-accent)" : "none",
                }}
              >
                <p
                  className="text-[10px] tracking-wider mb-4"
                  style={{
                    fontFamily: '"IBM Plex Mono", monospace',
                    color: plan.primary ? "var(--accent)" : "var(--text-muted)",
                    background: plan.primary ? "var(--accent-muted)" : "transparent",
                    border: plan.primary ? "1px solid var(--border-accent)" : "none",
                    display: "inline-block",
                    padding: plan.primary ? "2px 8px" : "0",
                    borderRadius: "var(--radius-sm)",
                  }}
                >
                  {plan.label}
                </p>
                <h3 className="text-2xl font-bold mb-1">{plan.name}</h3>
                <p className="text-3xl font-bold mb-3"
                  style={{ fontFamily: '"IBM Plex Mono", monospace', color: "var(--accent)" }}>
                  {plan.price}
                </p>
                <p className="text-sm mb-5" style={{ color: "var(--text-secondary)" }}>{plan.desc}</p>
                <div className="space-y-2 mb-6">
                  {plan.features.map((f) => (
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
                    background: plan.primary ? "var(--accent)" : "transparent",
                    color: plan.primary ? "var(--accent-foreground)" : "var(--accent)",
                    border: `1px solid ${plan.primary ? "var(--accent)" : "var(--border-accent)"}`,
                  }}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20" style={{ background: "var(--surface)" }}>
        <div className="max-w-3xl mx-auto px-6 md:px-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-12"
            style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
            Questions.
          </h2>
          <div className="space-y-0">
            {[
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
            ].map((item, i) => (
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
                  <ChevronDown className="w-5 h-5 flex-shrink-0 group-open:rotate-180 transition-transform"
                    style={{ color: "var(--accent)" }} />
                </summary>
                <p className="pb-5 text-sm leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}>
                  {item.a}
                </p>
              </details>
            ))}
            <div className="border-t" style={{ borderColor: "var(--border)" }} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 overflow-hidden" style={{ background: "var(--background)" }}>
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute inset-0 glow-teal" />
        <div className="relative max-w-3xl mx-auto px-6 md:px-8 text-center">
          <p className="text-xs tracking-widest mb-4"
            style={{ fontFamily: '"IBM Plex Mono", monospace', color: "var(--accent)" }}>
            THE SYSTEM THAT WORKS WHILE YOU SLEEP
          </p>
          <h2 className="text-5xl md:text-6xl font-bold mb-6"
            style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
            Stop managing your management system.
          </h2>
          <p className="text-xl mb-10" style={{ color: "var(--text-secondary)" }}>
            Meridian does the watching so you can do the living.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-[var(--radius-sm)] text-lg font-semibold transition-colors"
            style={{ background: "var(--accent)", color: "var(--accent-foreground)" }}
          >
            Join the waitlist
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: "var(--surface)", borderTop: "1px solid var(--border)" }}>
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <p className="text-lg font-bold tracking-[3px] mb-3"
                style={{ fontFamily: '"Space Grotesk", sans-serif', color: "var(--accent)" }}>
                MERIDIAN
              </p>
              <p className="text-sm leading-relaxed mb-2"
                style={{ color: "var(--text-muted)" }}>
                The AI-powered OS for people who operate at scale.
              </p>
              <p className="text-xs" style={{ fontFamily: '"IBM Plex Mono", monospace', color: "var(--text-muted)" }}>
                © 2026 ChimeStream B.V.
              </p>
            </div>
            <div>
              <p className="text-xs tracking-wider text-[var(--text-muted)] mb-3"
                style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
                PRODUCT
              </p>
              <div className="space-y-2">
                {["Dashboard", "Goals", "Habits", "Health", "Money", "Work"].map((item) => (
                  <Link key={item} href="/login"
                    className="block text-sm transition-colors hover:text-[var(--text-primary)]"
                    style={{ color: "var(--text-secondary)" }}>
                    {item}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs tracking-wider text-[var(--text-muted)] mb-3"
                style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
                COMPANY
              </p>
              <div className="space-y-2">
                {[
                  { label: "About", href: "/about" },
                  { label: "Contact", href: "/contact" },
                  { label: "Privacy Policy", href: "/privacy" },
                  { label: "Terms of Service", href: "/terms" },
                ].map((item) => (
                  <Link key={item.label} href={item.href}
                    className="block text-sm transition-colors hover:text-[var(--text-primary)]"
                    style={{ color: "var(--text-secondary)" }}>
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="pt-6 border-t" style={{ borderColor: "var(--border)" }}>
            <p className="text-xs text-center"
              style={{ fontFamily: '"IBM Plex Mono", monospace', color: "var(--text-muted)" }}>
              Built by Ash Hatef · Rotterdam, Netherlands
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

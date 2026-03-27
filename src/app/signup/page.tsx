import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function SignupPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: "var(--background)" }}
    >
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute inset-0 glow-teal" />

      <div
        className="relative w-full max-w-sm mx-4 rounded-[var(--radius-lg)] p-8 text-center"
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          boxShadow: "var(--shadow-elevated)",
        }}
      >
        <Link href="/">
          <p className="text-xl font-bold tracking-[3px] inline-block mb-8"
            style={{ fontFamily: '"Space Grotesk", sans-serif', color: "var(--accent)" }}>
            MERIDIAN
          </p>
        </Link>

        <div
          className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ background: "var(--accent-muted)", border: "1px solid var(--border-accent)" }}
        >
          <span className="text-xl">🔒</span>
        </div>

        <h1 className="text-2xl font-bold mb-3"
          style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
          This is a private instance.
        </h1>
        <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-secondary)" }}>
          Meridian is currently only available by invitation.
          Join the waitlist for early access when we open up.
        </p>

        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-[var(--radius-sm)] text-sm font-semibold transition-colors"
          style={{ background: "var(--accent)", color: "var(--accent-foreground)" }}
        >
          Join the waitlist
          <ArrowRight className="w-4 h-4" />
        </Link>

        <p className="text-xs mt-5" style={{ color: "var(--text-muted)" }}>
          Already have an account?{" "}
          <Link href="/login" className="text-[var(--accent)] hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}

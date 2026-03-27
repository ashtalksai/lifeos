"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, Loader2 } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    if (result?.ok) {
      router.push("/dashboard")
    } else {
      setError("Invalid credentials. Try ashkanhatef@gmail.com / lifeos")
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: "var(--background)" }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute inset-0 glow-teal" />

      {/* Card */}
      <div
        className="relative w-full max-w-sm mx-4 rounded-[var(--radius-lg)] p-8"
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          boxShadow: "var(--shadow-elevated)",
        }}
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/">
            <p
              className="text-xl font-bold tracking-[3px] inline-block"
              style={{ fontFamily: '"Space Grotesk", sans-serif', color: "var(--accent)" }}
            >
              MERIDIAN
            </p>
          </Link>
        </div>

        <h1 className="text-2xl font-bold mb-1"
          style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
          Welcome back.
        </h1>
        <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
          Your brief is ready.
        </p>

        {error && (
          <div
            className="mb-4 p-3 rounded-[var(--radius-sm)] text-sm"
            style={{
              background: "rgba(239,68,68,0.08)",
              border: "1px solid rgba(239,68,68,0.3)",
              color: "var(--destructive)",
              fontFamily: '"IBM Plex Mono", monospace',
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className="block text-xs tracking-wider mb-1.5"
              style={{ fontFamily: '"IBM Plex Mono", monospace', color: "var(--text-muted)" }}
            >
              EMAIL
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="w-full px-3 py-2.5 rounded-[var(--radius-sm)] text-sm transition-all"
              style={{
                background: "var(--surface-elevated)",
                border: "1px solid var(--border)",
                color: "var(--text-primary)",
                outline: "none",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "var(--accent)"
                e.target.style.boxShadow = "0 0 0 2px var(--accent-muted)"
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "var(--border)"
                e.target.style.boxShadow = "none"
              }}
            />
          </div>

          <div>
            <label
              className="block text-xs tracking-wider mb-1.5"
              style={{ fontFamily: '"IBM Plex Mono", monospace', color: "var(--text-muted)" }}
            >
              PASSWORD
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full px-3 py-2.5 pr-10 rounded-[var(--radius-sm)] text-sm transition-all"
                style={{
                  background: "var(--surface-elevated)",
                  border: "1px solid var(--border)",
                  color: "var(--text-primary)",
                  outline: "none",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "var(--accent)"
                  e.target.style.boxShadow = "0 0 0 2px var(--accent-muted)"
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "var(--border)"
                  e.target.style.boxShadow = "none"
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="text-right">
            <button type="button" className="text-sm transition-colors"
              style={{ color: "var(--text-muted)", fontFamily: '"IBM Plex Mono", monospace', fontSize: "12px" }}>
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-[var(--radius-sm)] text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
            style={{
              background: "var(--accent)",
              color: "var(--accent-foreground)",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {loading ? "Signing in..." : "Log in"}
          </button>
        </form>

        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t" style={{ borderColor: "var(--border)" }} />
          </div>
          <div className="relative flex justify-center text-xs" style={{ color: "var(--text-muted)" }}>
            <span className="px-3" style={{ background: "var(--surface)" }}>or</span>
          </div>
        </div>

        <button
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="w-full py-2.5 rounded-[var(--radius-sm)] text-sm font-medium flex items-center justify-center gap-2 transition-colors"
          style={{
            border: "1px solid var(--border)",
            color: "var(--text-secondary)",
            background: "var(--surface-elevated)",
          }}
        >
          <span className="text-base">G</span>
          Continue with Google
        </button>

        <p className="text-center text-xs mt-5" style={{ color: "var(--text-muted)" }}>
          New to Meridian?{" "}
          <Link href="/signup" className="text-[var(--accent)] hover:underline">
            Join the waitlist →
          </Link>
        </p>
      </div>
    </div>
  )
}

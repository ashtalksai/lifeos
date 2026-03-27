"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function SignupPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })
      if (res?.ok) {
        router.push("/dashboard")
      } else {
        setError("Something went wrong. Try again.")
      }
    } catch {
      setError("Something went wrong. Try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: "var(--background)" }}
    >
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute inset-0 glow-teal" />

      <div
        className="relative w-full max-w-sm mx-4 rounded-[var(--radius-lg)] p-8"
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          boxShadow: "var(--shadow-elevated)",
        }}
      >
        <Link href="/">
          <p
            className="text-xl font-bold tracking-[3px] inline-block mb-8"
            style={{ fontFamily: '"Space Grotesk", sans-serif', color: "var(--accent)" }}
          >
            MERIDIAN
          </p>
        </Link>

        <h1
          className="text-2xl font-bold mb-1"
          style={{ fontFamily: '"Space Grotesk", sans-serif' }}
        >
          Create account
        </h1>
        <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
          Your personal operating system.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2.5 rounded-[var(--radius-sm)] text-sm outline-none"
            style={{
              background: "var(--surface-elevated)",
              border: "1px solid var(--border)",
              color: "var(--text-primary)",
              fontFamily: '"IBM Plex Mono", monospace',
            }}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2.5 rounded-[var(--radius-sm)] text-sm outline-none"
            style={{
              background: "var(--surface-elevated)",
              border: "1px solid var(--border)",
              color: "var(--text-primary)",
              fontFamily: '"IBM Plex Mono", monospace',
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2.5 rounded-[var(--radius-sm)] text-sm outline-none"
            style={{
              background: "var(--surface-elevated)",
              border: "1px solid var(--border)",
              color: "var(--text-primary)",
              fontFamily: '"IBM Plex Mono", monospace',
            }}
          />

          {error && (
            <p className="text-xs" style={{ color: "#ff4d4f" }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-[var(--radius-sm)] text-sm font-semibold transition-opacity"
            style={{
              background: "var(--accent)",
              color: "var(--accent-foreground)",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Creating account..." : "Get started"}
          </button>
        </form>

        <p className="text-xs mt-5 text-center" style={{ color: "var(--text-muted)" }}>
          Already have an account?{" "}
          <Link href="/login" className="text-[var(--accent)] hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}

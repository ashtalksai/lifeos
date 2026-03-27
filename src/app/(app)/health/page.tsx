"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Heart,
  CheckCircle,
  XCircle,
  Moon,
  Zap,
  Activity,
  Calendar,
} from "lucide-react"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="px-3 py-2 rounded-[4px] text-xs"
        style={{
          background: "var(--surface-elevated)",
          border: "1px solid var(--border-strong)",
          fontFamily: '"IBM Plex Mono", monospace',
          color: "var(--text-primary)",
        }}
      >
        <p className="text-[var(--text-muted)] mb-1">{label}</p>
        {payload.map((p) => (
          <p key={p.name} style={{ color: "var(--accent)" }}>
            {p.name}: {p.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

function DotScore({ value, max = 5, color = "var(--accent)" }: { value: number | null; max?: number; color?: string }) {
  return (
    <div className="flex gap-1.5">
      {Array.from({ length: max }, (_, i) => (
        <div
          key={i}
          className="w-3 h-3 rounded-full border"
          style={{
            background: i < (value ?? 0) ? color : "transparent",
            borderColor: i < (value ?? 0) ? color : "var(--border-strong)",
          }}
        />
      ))}
    </div>
  )
}

// Mock 30-day data
function generateMockData() {
  return Array.from({ length: 30 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (29 - i))
    return {
      date: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      sleep: 5.5 + Math.random() * 3,
      gym: Math.random() > 0.35 ? 1 : 0,
      energy: Math.floor(2 + Math.random() * 3),
      mood: Math.floor(2 + Math.random() * 3),
    }
  })
}

const mockData = generateMockData()

const DAYS = ["M", "T", "W", "T", "F", "S", "S"]

export default function HealthPage() {
  const [metrics, setMetrics] = useState<Array<{ type: string; value: number; date: string }>>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/metrics")
      .then((r) => r.json())
      .then((d) => {
        setMetrics(d.metrics || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const todayGym = metrics.find((m) => m.type === "gym_done")?.value
  const todaySleep = metrics.find((m) => m.type === "sleep_hours")?.value
  const todayEnergy = metrics.find((m) => m.type === "energy")?.value ?? null
  const todayMood = metrics.find((m) => m.type === "mood")?.value ?? null

  // 7-day gym streak from mock data
  const last7 = mockData.slice(-7)

  return (
    <div className="p-6 space-y-6 max-w-5xl">
      {/* Header */}
      <div>
        <p className="text-xs tracking-wider text-[var(--text-muted)] mb-1 flex items-center gap-1.5"
          style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
          <Heart className="w-3.5 h-3.5" /> HEALTH
        </p>
        <h1 className="text-3xl font-bold text-[var(--text-primary)]"
          style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
          Health Dashboard
        </h1>
      </div>

      {/* Today's check-in */}
      <div
        className="rounded-[var(--radius-md)] p-5"
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border-accent)",
          borderLeft: "2px solid var(--accent)",
        }}
      >
        <p className="text-xs tracking-wider text-[var(--text-muted)] mb-4"
          style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
          TODAY
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Gym */}
          <div>
            <p className="text-xs text-[var(--text-muted)] mb-2" style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
              GYM
            </p>
            {todayGym === 1 ? (
              <div className="flex items-center gap-1.5 text-[var(--success)]">
                <CheckCircle className="w-5 h-5" />
                <span className="font-semibold">Done</span>
              </div>
            ) : todayGym === 0 ? (
              <div className="flex items-center gap-1.5 text-[var(--destructive)]">
                <XCircle className="w-5 h-5" />
                <span className="font-semibold">Missed</span>
              </div>
            ) : (
              <p className="text-sm text-[var(--text-muted)]">No data</p>
            )}
          </div>
          {/* Sleep */}
          <div>
            <p className="text-xs text-[var(--text-muted)] mb-2" style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
              SLEEP
            </p>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-[var(--text-primary)]"
                style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
                {todaySleep ?? "—"}
              </span>
              {todaySleep && <span className="text-sm text-[var(--text-secondary)]">hours</span>}
            </div>
          </div>
          {/* Energy */}
          <div>
            <p className="text-xs text-[var(--text-muted)] mb-2" style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
              ENERGY
            </p>
            <DotScore value={todayEnergy} color="var(--accent)" />
            {todayEnergy && (
              <p className="text-xs text-[var(--text-muted)] mt-1" style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
                {todayEnergy}/5
              </p>
            )}
          </div>
          {/* Mood */}
          <div>
            <p className="text-xs text-[var(--text-muted)] mb-2" style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
              MOOD
            </p>
            <DotScore value={todayMood} color="var(--info)" />
            {todayMood && (
              <p className="text-xs text-[var(--text-muted)] mt-1" style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
                {todayMood}/5
              </p>
            )}
          </div>
        </div>

        {/* 7-day gym strip */}
        <div className="mt-5 pt-4 border-t border-[var(--border)]">
          <p className="text-xs tracking-wider text-[var(--text-muted)] mb-2"
            style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
            LAST 7 DAYS
          </p>
          <div className="flex gap-2">
            {last7.map((day, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div
                  className="w-8 h-8 rounded-[var(--radius-sm)]"
                  style={{
                    background: day.gym === 1 ? "var(--success)" : "var(--surface-elevated)",
                    border: `1px solid ${day.gym === 1 ? "var(--success)" : "var(--border)"}`,
                  }}
                />
                <span className="text-[10px] text-[var(--text-muted)]"
                  style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
                  {DAYS[i]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trends */}
      <div>
        <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4"
          style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
          30-Day View
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Sleep */}
          <div className="rounded-[var(--radius-md)] p-4"
            style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
            <p className="text-xs tracking-wider text-[var(--text-muted)] mb-4"
              style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
              SLEEP TREND
            </p>
            <ResponsiveContainer width="100%" height={140}>
              <AreaChart data={mockData} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
                <defs>
                  <linearGradient id="sleepGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00d4c8" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#00d4c8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(30,45,74,0.5)" />
                <XAxis dataKey="date" tick={{ fontSize: 10, fontFamily: '"IBM Plex Mono", monospace', fill: "var(--text-muted)" }} tickLine={false} interval={6} />
                <YAxis tick={{ fontSize: 10, fontFamily: '"IBM Plex Mono", monospace', fill: "var(--text-muted)" }} tickLine={false} domain={[0, 10]} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="sleep" stroke="#00d4c8" fill="url(#sleepGrad)" strokeWidth={1.5} dot={false} name="sleep h" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Gym Frequency */}
          <div className="rounded-[var(--radius-md)] p-4"
            style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
            <p className="text-xs tracking-wider text-[var(--text-muted)] mb-4"
              style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
              GYM FREQUENCY
            </p>
            <ResponsiveContainer width="100%" height={140}>
              <BarChart data={mockData} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(30,45,74,0.5)" vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 10, fontFamily: '"IBM Plex Mono", monospace', fill: "var(--text-muted)" }} tickLine={false} interval={6} />
                <YAxis tick={{ fontSize: 10, fontFamily: '"IBM Plex Mono", monospace', fill: "var(--text-muted)" }} tickLine={false} domain={[0, 1]} ticks={[0, 1]} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="gym" fill="#00d4c8" radius={[2, 2, 0, 0]} maxBarSize={12} name="gym" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Energy */}
          <div className="rounded-[var(--radius-md)] p-4"
            style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
            <p className="text-xs tracking-wider text-[var(--text-muted)] mb-4"
              style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
              ENERGY TREND
            </p>
            <ResponsiveContainer width="100%" height={140}>
              <LineChart data={mockData} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(30,45,74,0.5)" />
                <XAxis dataKey="date" tick={{ fontSize: 10, fontFamily: '"IBM Plex Mono", monospace', fill: "var(--text-muted)" }} tickLine={false} interval={6} />
                <YAxis tick={{ fontSize: 10, fontFamily: '"IBM Plex Mono", monospace', fill: "var(--text-muted)" }} tickLine={false} domain={[0, 5]} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="energy" stroke="#3b82f6" strokeWidth={1.5} dot={false} name="energy" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Mood */}
          <div className="rounded-[var(--radius-md)] p-4"
            style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
            <p className="text-xs tracking-wider text-[var(--text-muted)] mb-4"
              style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
              MOOD TREND
            </p>
            <ResponsiveContainer width="100%" height={140}>
              <LineChart data={mockData} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(30,45,74,0.5)" />
                <XAxis dataKey="date" tick={{ fontSize: 10, fontFamily: '"IBM Plex Mono", monospace', fill: "var(--text-muted)" }} tickLine={false} interval={6} />
                <YAxis tick={{ fontSize: 10, fontFamily: '"IBM Plex Mono", monospace', fill: "var(--text-muted)" }} tickLine={false} domain={[0, 5]} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="mood" stroke="#22c55e" strokeWidth={1.5} dot={false} name="mood" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* History Calendar */}
      <div>
        <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4"
          style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
          History
        </h2>
        <div className="rounded-[var(--radius-md)] p-5"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
          <div className="flex gap-1 flex-wrap">
            {Array.from({ length: 30 }, (_, i) => {
              const d = mockData[i]
              return (
                <div
                  key={i}
                  className="w-5 h-5 rounded-[2px] transition-opacity cursor-pointer hover:opacity-80"
                  style={{
                    background: d.gym === 1
                      ? `rgba(0,212,200,${0.4 + d.sleep / 10 * 0.6})`
                      : "var(--surface-elevated)",
                    border: "1px solid var(--border)",
                  }}
                  title={`${d.date} — Gym: ${d.gym === 1 ? "✅" : "❌"} · Sleep: ${d.sleep.toFixed(1)}h · Energy: ${d.energy}/5`}
                />
              )
            })}
          </div>
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-[2px]" style={{ background: "var(--accent)" }} />
              <span className="text-xs text-[var(--text-muted)]" style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
                Gym done
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-[2px]" style={{ background: "var(--surface-elevated)", border: "1px solid var(--border)" }} />
              <span className="text-xs text-[var(--text-muted)]" style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
                No gym
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

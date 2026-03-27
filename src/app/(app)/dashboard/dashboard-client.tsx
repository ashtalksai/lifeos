"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Brain,
  LayoutGrid,
  Flame,
  Heart,
  DollarSign,
  Briefcase,
  Target,
  Users,
  RefreshCw,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ChevronRight,
  Plus,
  PenLine,
  Keyboard,
  TrendingDown,
  TrendingUp,
  Activity,
} from "lucide-react"
import Link from "next/link"

interface DashboardData {
  habits: Array<{
    id: string
    name: string
    icon: string
    streak: number
    category: string
    color: string
    logs: Array<{ id: string }>
  }>
  metrics: Array<{ type: string; value: number; date: Date | string }>
  goals: Array<{
    id: string
    title: string
    timeframe: string
    category: string
    progress: number
    status: string
  }>
  journal: { content: string; mood: number | null } | null
  completedHabitsToday: number
  totalHabitsToday: number
  aibrief?: string | null
  checkInDone?: boolean
}

function getLatestMetric(metrics: DashboardData["metrics"], type: string) {
  return metrics.find((m) => m.type === type)?.value ?? null
}

const timeframeLabels: Record<string, string> = {
  "30yr": "30YR",
  "5yr": "5YR",
  "1yr": "1YR",
  quarterly: "QUARTER",
  monthly: "MONTH",
  weekly: "WEEK",
}

function DotScore({ value, max = 5, color = "var(--accent)" }: { value: number | null; max?: number; color?: string }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: max }, (_, i) => (
        <div
          key={i}
          className="w-2.5 h-2.5 rounded-full border"
          style={{
            background: i < (value ?? 0) ? color : "transparent",
            borderColor: i < (value ?? 0) ? color : "var(--border-strong)",
          }}
        />
      ))}
    </div>
  )
}

function CheckInOverlay({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0)
  const [values, setValues] = useState({ gym: null as boolean | null, sleep: 7, energy: 0, mood: 0 })
  const [saving, setSaving] = useState(false)

  const handleDone = async () => {
    setSaving(true)
    try {
      const entries = [
        { type: "gym_done", value: values.gym ? 1 : 0 },
        { type: "sleep_hours", value: values.sleep },
        { type: "energy", value: values.energy },
        { type: "mood", value: values.mood },
      ]
      await Promise.all(
        entries.map((e) =>
          fetch("/api/metrics", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(e),
          })
        )
      )
    } catch {}
    setSaving(false)
    onClose()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed bottom-24 right-6 w-80 rounded-[var(--radius-lg)] p-5 z-30"
      style={{
        background: "var(--surface-elevated)",
        border: "1px solid var(--border-accent)",
        boxShadow: "var(--shadow-elevated)",
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-semibold text-[var(--text-primary)]">Good morning. Quick update?</p>
        <button onClick={onClose} className="text-[var(--text-muted)] hover:text-[var(--text-primary)]">
          ✕
        </button>
      </div>

      <div className="space-y-4">
        {/* Gym */}
        <div>
          <p className="text-xs font-mono text-[var(--text-muted)] mb-2" style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
            GYM YESTERDAY?
          </p>
          <div className="flex gap-2">
            {[true, false].map((v) => (
              <button
                key={String(v)}
                onClick={() => setValues((p) => ({ ...p, gym: v }))}
                className="flex-1 py-2 rounded-[var(--radius-sm)] text-sm font-medium transition-all"
                style={{
                  background:
                    values.gym === v ? (v ? "var(--success)" : "var(--destructive)") : "var(--surface)",
                  border: `1px solid ${values.gym === v ? (v ? "var(--success)" : "var(--destructive)") : "var(--border)"}`,
                  color: values.gym === v ? "#fff" : "var(--text-secondary)",
                }}
              >
                {v ? "Yes" : "No"}
              </button>
            ))}
          </div>
        </div>

        {/* Sleep */}
        <div>
          <p className="text-xs font-mono text-[var(--text-muted)] mb-2" style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
            SLEEP HOURS?
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setValues((p) => ({ ...p, sleep: Math.max(0, p.sleep - 0.5) }))}
              className="w-8 h-8 rounded-full flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--accent)] border border-[var(--border)] transition-colors"
            >
              –
            </button>
            <span className="text-xl font-mono font-bold text-[var(--text-primary)] w-12 text-center"
              style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
              {values.sleep}h
            </span>
            <button
              onClick={() => setValues((p) => ({ ...p, sleep: Math.min(12, p.sleep + 0.5) }))}
              className="w-8 h-8 rounded-full flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--accent)] border border-[var(--border)] transition-colors"
            >
              +
            </button>
          </div>
        </div>

        {/* Energy */}
        <div>
          <p className="text-xs font-mono text-[var(--text-muted)] mb-2" style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
            ENERGY (1-5)?
          </p>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                onClick={() => setValues((p) => ({ ...p, energy: n }))}
                className="w-9 h-9 rounded-full border-2 text-sm font-mono font-medium transition-all"
                style={{
                  background: n <= values.energy ? "var(--accent)" : "transparent",
                  borderColor: n <= values.energy ? "var(--accent)" : "var(--border-strong)",
                  color: n <= values.energy ? "var(--accent-foreground)" : "var(--text-secondary)",
                }}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        {/* Mood */}
        <div>
          <p className="text-xs font-mono text-[var(--text-muted)] mb-2" style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
            MOOD (1-5)?
          </p>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                onClick={() => setValues((p) => ({ ...p, mood: n }))}
                className="w-9 h-9 rounded-full border-2 text-sm font-mono font-medium transition-all"
                style={{
                  background: n <= values.mood ? "var(--info)" : "transparent",
                  borderColor: n <= values.mood ? "var(--info)" : "var(--border-strong)",
                  color: n <= values.mood ? "#fff" : "var(--text-secondary)",
                }}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleDone}
          disabled={saving}
          className="w-full py-2.5 rounded-[var(--radius-sm)] text-sm font-semibold transition-colors mt-2"
          style={{
            background: "var(--accent)",
            color: "var(--accent-foreground)",
          }}
        >
          {saving ? "Saving..." : "Done →"}
        </button>
      </div>
    </motion.div>
  )
}

function AIBriefCard({ brief }: { brief: string | null | undefined }) {
  const [loading, setLoading] = useState(false)
  const [currentBrief, setCurrentBrief] = useState(brief)

  const refresh = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/ai-brief", { method: "POST" })
      const data = await res.json()
      setCurrentBrief(data.brief)
    } catch {}
    setLoading(false)
  }

  const now = new Date()
  const timeStr = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false })

  const defaultBrief = "Connect your data feeds and complete your morning check-in to receive your first AI brief. Meridian analyzes your patterns overnight and delivers clarity at 7am."

  return (
    <div
      className="relative overflow-hidden rounded-[var(--radius-md)] p-5"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border-accent)",
        borderLeft: "2px solid var(--accent)",
        boxShadow: "var(--shadow-accent)",
      }}
    >
      {/* Scan line */}
      {!loading && <div className="scan-line" />}

      <div className="flex items-center justify-between mb-3">
        <span
          className="text-[11px] tracking-wider text-[var(--text-muted)]"
          style={{ fontFamily: '"IBM Plex Mono", monospace' }}
        >
          AI BRIEF
        </span>
        <div className="flex items-center gap-3">
          {loading ? (
            <div className="flex items-center gap-2">
              <span className="pulse-teal" />
              <span
                className="text-xs text-[var(--accent)]"
                style={{ fontFamily: '"IBM Plex Mono", monospace' }}
              >
                Generating...
              </span>
            </div>
          ) : (
            <span
              className="text-xs text-[var(--text-secondary)]"
              style={{ fontFamily: '"IBM Plex Mono", monospace' }}
            >
              Generated {timeStr}
            </span>
          )}
        </div>
      </div>

      {loading ? (
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="skeleton h-4 rounded w-full" style={{ width: i === 3 ? "60%" : "100%" }} />
          ))}
        </div>
      ) : (
        <p className="text-[var(--text-primary)] text-sm leading-relaxed">
          {currentBrief || defaultBrief}
        </p>
      )}

      <div className="mt-3">
        <button
          onClick={refresh}
          disabled={loading}
          className="flex items-center gap-1.5 text-xs text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors"
          style={{ fontFamily: '"IBM Plex Mono", monospace' }}
        >
          <RefreshCw className="w-3 h-3" />
          Refresh brief
        </button>
      </div>
    </div>
  )
}

// Use per-element inline initial/animate instead of custom variants to avoid TS issues
const bentoVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export function DashboardClient({ data, userName }: { data: DashboardData; userName: string }) {
  const { habits, metrics, goals, completedHabitsToday, totalHabitsToday, aibrief } = data
  const [showCheckIn, setShowCheckIn] = useState(!data.checkInDone)
  const [quickActionsOpen, setQuickActionsOpen] = useState(false)

  const sleepHours = getLatestMetric(metrics, "sleep_hours")
  const mood = getLatestMetric(metrics, "mood")
  const energy = getLatestMetric(metrics, "energy")
  const gymDone = getLatestMetric(metrics, "gym_done")

  const now = new Date()
  const dayLabel = now.toLocaleDateString("en-US", { weekday: "long" }).toUpperCase()
  const dateLabel = now.toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" }).toUpperCase()

  const topGoals = goals.filter((g) => g.status === "active").slice(0, 3)
  const topHabits = habits.slice(0, 7)
  const topStreak = habits.reduce((max, h) => Math.max(max, h.streak), 0)

  return (
    <div className="relative min-h-screen" style={{ maxWidth: "var(--dashboard-max)", margin: "0 auto" }}>
      <div className="p-6 space-y-5">
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <span
            className="text-sm text-[var(--text-secondary)]"
            style={{ fontFamily: '"IBM Plex Mono", monospace' }}
          >
            {dayLabel} · {dateLabel}
          </span>
          <div className="flex items-center gap-3">
            <span
              className="text-sm text-[var(--accent)]"
              style={{ fontFamily: '"IBM Plex Mono", monospace' }}
            >
              🔥 {topStreak} days
            </span>
          </div>
        </div>

        {/* AI Brief */}
        <AIBriefCard brief={aibrief} />

        {/* Dimensions Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Work Widget */}
          <motion.div initial="hidden" animate="visible" variants={bentoVariants} transition={{ duration: 0.3, delay: 0 }}>
            <Link href="/work" className="block group">
              <div
                className="p-5 rounded-[var(--radius-md)] transition-all duration-150 cursor-pointer"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="text-[11px] tracking-wider text-[var(--text-muted)] flex items-center gap-2"
                    style={{ fontFamily: '"IBM Plex Mono", monospace' }}
                  >
                    <Briefcase className="w-3.5 h-3.5" />
                    WORK
                  </span>
                  <ChevronRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors" />
                </div>
                <div className="text-3xl font-bold text-[var(--accent)] mb-1"
                  style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
                  4
                  <span className="text-sm font-normal text-[var(--text-secondary)] ml-1">cards</span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] mb-3" style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
                  Doing on Trello
                </p>
                <div className="space-y-1">
                  {["Life OS — Stage 4 Build", "Stravix growth plan", "Gradient: AI automation"].map((card) => (
                    <p key={card} className="text-xs text-[var(--text-muted)] truncate"
                      style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
                      · {card}
                    </p>
                  ))}
                </div>
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-[var(--text-muted)] mb-1"
                    style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
                    <span>Gradient hours</span>
                    <span>6h / 12h</span>
                  </div>
                  <div className="h-1 rounded-full bg-[var(--surface-elevated)]">
                    <div className="h-1 rounded-full bg-[var(--accent)]" style={{ width: "50%" }} />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Health Widget */}
          <motion.div initial="hidden" animate="visible" variants={bentoVariants} transition={{ duration: 0.3, delay: 0 }}>
            <Link href="/health" className="block group">
              <div
                className="p-5 rounded-[var(--radius-md)] transition-all duration-150 cursor-pointer"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="text-[11px] tracking-wider text-[var(--text-muted)] flex items-center gap-2"
                    style={{ fontFamily: '"IBM Plex Mono", monospace' }}
                  >
                    <Heart className="w-3.5 h-3.5" />
                    HEALTH
                  </span>
                  <ChevronRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors" />
                </div>
                <div className="flex items-center gap-4 mb-3">
                  <div>
                    {gymDone === 1 ? (
                      <div className="flex items-center gap-1.5 text-[var(--success)]">
                        <CheckCircle className="w-6 h-6" />
                        <span className="text-sm font-medium">Gym done</span>
                      </div>
                    ) : gymDone === 0 ? (
                      <div className="flex items-center gap-1.5 text-[var(--destructive)]">
                        <XCircle className="w-6 h-6" />
                        <span className="text-sm font-medium">No gym</span>
                      </div>
                    ) : (
                      <p className="text-sm text-[var(--text-muted)]">No data yet</p>
                    )}
                  </div>
                  {sleepHours !== null && (
                    <div>
                      <span className="text-2xl font-bold text-[var(--text-primary)]"
                        style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
                        {sleepHours}h
                      </span>
                      <p className="text-xs text-[var(--text-muted)]">sleep</p>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[var(--text-muted)]"
                      style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
                      ENERGY
                    </span>
                    <DotScore value={energy} color="var(--accent)" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[var(--text-muted)]"
                      style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
                      MOOD
                    </span>
                    <DotScore value={mood} color="var(--info)" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Money Widget */}
          <motion.div initial="hidden" animate="visible" variants={bentoVariants} transition={{ duration: 0.3, delay: 0 }}>
            <Link href="/money" className="block group">
              <div
                className="p-5 rounded-[var(--radius-md)] transition-all duration-150 cursor-pointer"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="text-[11px] tracking-wider text-[var(--text-muted)] flex items-center gap-2"
                    style={{ fontFamily: '"IBM Plex Mono", monospace' }}
                  >
                    <DollarSign className="w-3.5 h-3.5" />
                    MONEY
                  </span>
                  <ChevronRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors" />
                </div>
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-[var(--text-muted)] mb-1.5"
                    style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
                    <span>Monthly burn</span>
                    <span>€1,840 / €4,000</span>
                  </div>
                  <div className="h-1 rounded-full bg-[var(--surface-elevated)]">
                    <div className="h-1 rounded-full bg-[var(--warning)]" style={{ width: "46%" }} />
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[var(--destructive)] mb-1">
                  <TrendingDown className="w-4 h-4" />
                  <span className="text-lg font-bold" style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
                    €47,200
                  </span>
                </div>
                <p className="text-xs text-[var(--text-muted)]" style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
                  debt remaining
                </p>
                <div className="mt-2 flex items-center gap-1.5 text-[var(--success)]">
                  <TrendingDown className="w-3.5 h-3.5" />
                  <span className="text-xs" style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
                    ↓ €320 this month · ~23 months to free
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Goals Widget */}
          <motion.div initial="hidden" animate="visible" variants={bentoVariants} transition={{ duration: 0.3, delay: 0 }}>
            <Link href="/goals" className="block group">
              <div
                className="p-5 rounded-[var(--radius-md)] transition-all duration-150 cursor-pointer"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="text-[11px] tracking-wider text-[var(--text-muted)] flex items-center gap-2"
                    style={{ fontFamily: '"IBM Plex Mono", monospace' }}
                  >
                    <Target className="w-3.5 h-3.5" />
                    GOALS
                  </span>
                  <ChevronRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors" />
                </div>
                {topGoals.length === 0 ? (
                  <p className="text-sm text-[var(--text-muted)]">No active goals. Add one →</p>
                ) : (
                  <div className="space-y-3">
                    {topGoals.map((goal) => (
                      <div key={goal.id}>
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-xs text-[var(--text-primary)] truncate flex-1 mr-2">
                            {goal.title}
                          </p>
                          <span
                            className="text-[10px] px-1.5 py-0.5 rounded-[2px] flex-shrink-0"
                            style={{
                              background: "var(--surface-elevated)",
                              border: "1px solid var(--border)",
                              color: "var(--text-muted)",
                              fontFamily: '"IBM Plex Mono", monospace',
                            }}
                          >
                            {timeframeLabels[goal.timeframe] || goal.timeframe}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1 rounded-full bg-[var(--surface-elevated)]">
                            <div
                              className="h-1 rounded-full bg-[var(--accent)] transition-all"
                              style={{ width: `${goal.progress}%` }}
                            />
                          </div>
                          <span
                            className="text-[11px] text-[var(--accent)] w-7 text-right"
                            style={{ fontFamily: '"IBM Plex Mono", monospace' }}
                          >
                            {goal.progress}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          </motion.div>

          {/* Projects / Pipeline Widget */}
          <motion.div initial="hidden" animate="visible" variants={bentoVariants} transition={{ duration: 0.3, delay: 0 }}>
            <div
              className="p-5 rounded-[var(--radius-md)]"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className="text-[11px] tracking-wider text-[var(--text-muted)] flex items-center gap-2"
                  style={{ fontFamily: '"IBM Plex Mono", monospace' }}
                >
                  <Activity className="w-3.5 h-3.5" />
                  PROJECTS
                </span>
              </div>
              <div className="flex gap-6 mb-3">
                <div>
                  <span className="text-3xl font-bold text-[var(--accent)]"
                    style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
                    7
                  </span>
                  <p className="text-xs text-[var(--text-muted)]">active builds</p>
                </div>
                <div>
                  <span className="text-3xl font-bold text-[var(--text-secondary)]"
                    style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
                    12
                  </span>
                  <p className="text-xs text-[var(--text-muted)]">deployed</p>
                </div>
              </div>
              <div className="space-y-1">
                {["lifeos.ashketing.com", "stravix.com", "chimestream.com"].map((url) => (
                  <p key={url} className="text-xs text-[var(--text-muted)] truncate"
                    style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
                    · {url}
                  </p>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Personal Widget */}
          <motion.div initial="hidden" animate="visible" variants={bentoVariants} transition={{ duration: 0.3, delay: 0 }}>
            <div
              className="p-5 rounded-[var(--radius-md)]"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className="text-[11px] tracking-wider text-[var(--text-muted)] flex items-center gap-2"
                  style={{ fontFamily: '"IBM Plex Mono", monospace' }}
                >
                  <Users className="w-3.5 h-3.5" />
                  PERSONAL
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs text-[var(--text-muted)]"
                    style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
                    WATCHLIST
                  </span>
                  <span className="text-xs text-[var(--text-primary)]"
                    style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
                    3 items
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-[var(--text-muted)]"
                    style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
                    READING
                  </span>
                  <span className="text-xs text-[var(--text-primary)]"
                    style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
                    2 books
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-[var(--text-muted)]"
                    style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
                    UPCOMING
                  </span>
                  <span className="text-xs text-[var(--text-primary)]"
                    style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
                    1 event
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Habits Strip */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <span
              className="text-[11px] tracking-wider text-[var(--text-muted)] flex items-center gap-2"
              style={{ fontFamily: '"IBM Plex Mono", monospace' }}
            >
              <Flame className="w-3.5 h-3.5" />
              HABITS
            </span>
            <Link href="/habits" className="text-xs text-[var(--accent)] hover:text-[var(--accent-hover)]"
              style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
              Manage →
            </Link>
          </div>
          {topHabits.length === 0 ? (
            <div
              className="p-4 rounded-[var(--radius-md)] text-center"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
            >
              <Link href="/habits" className="text-sm text-[var(--accent)] hover:underline">
                Add your first habit →
              </Link>
            </div>
          ) : (
            <div className="flex gap-4 overflow-x-auto pb-2">
              {topHabits.map((habit) => {
                const done = habit.logs.length > 0
                return (
                  <div key={habit.id} className="flex flex-col items-center gap-1.5 flex-shrink-0">
                    <div
                      className="w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer"
                      style={{
                        background: done ? "var(--accent)" : "var(--surface)",
                        borderColor: done ? "var(--accent)" : "var(--border-strong)",
                      }}
                    >
                      <span
                        className="text-base font-bold"
                        style={{
                          fontFamily: '"IBM Plex Mono", monospace',
                          color: done ? "var(--accent-foreground)" : "var(--text-secondary)",
                        }}
                      >
                        {habit.streak > 0 ? habit.streak : habit.icon}
                      </span>
                    </div>
                    <span
                      className="text-[10px] tracking-wide text-[var(--text-muted)] text-center max-w-[48px] truncate"
                      style={{ fontFamily: '"IBM Plex Mono", monospace' }}
                    >
                      {habit.name.toUpperCase().slice(0, 5)}
                    </span>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Morning Check-in Overlay */}
      {showCheckIn && <CheckInOverlay onClose={() => setShowCheckIn(false)} />}

      {/* Quick Actions FAB */}
      <div className="fixed bottom-6 right-6 z-20">
        <div className="relative">
          {quickActionsOpen && (
            <div className="absolute bottom-14 right-0 flex flex-col gap-2 items-end">
              {[
                { icon: PenLine, label: "Log data", href: "/health" },
                { icon: Target, label: "Add goal", href: "/goals" },
                { icon: Keyboard, label: "Check in", action: () => setShowCheckIn(true) },
              ].map((action, i) => (
                <motion.div
                  key={action.label}
                  custom={i}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: i * 0.05, duration: 0.2, ease: "backOut" }}
                  className="flex items-center gap-2"
                >
                  <span className="text-xs text-[var(--text-secondary)] bg-[var(--surface-elevated)] px-2 py-1 rounded-[var(--radius-sm)] border border-[var(--border)]">
                    {action.label}
                  </span>
                  {action.href ? (
                    <Link
                      href={action.href}
                      className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                      style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-accent)" }}
                      onClick={() => setQuickActionsOpen(false)}
                    >
                      <action.icon className="w-4 h-4 text-[var(--accent)]" />
                    </Link>
                  ) : (
                    <button
                      onClick={() => { setQuickActionsOpen(false); action.action?.() }}
                      className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                      style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-accent)" }}
                    >
                      <action.icon className="w-4 h-4 text-[var(--accent)]" />
                    </button>
                  )}
                </motion.div>
              ))}
            </div>
          )}
          <button
            onClick={() => setQuickActionsOpen(!quickActionsOpen)}
            className="w-14 h-14 rounded-full flex items-center justify-center transition-all shadow-lg"
            style={{
              background: "var(--accent)",
              boxShadow: "var(--shadow-accent), 0 4px 12px rgba(0,0,0,0.3)",
            }}
          >
            <Plus
              className="w-6 h-6 transition-transform"
              style={{
                color: "var(--accent-foreground)",
                transform: quickActionsOpen ? "rotate(45deg)" : "rotate(0deg)",
              }}
            />
          </button>
        </div>
      </div>
    </div>
  )
}

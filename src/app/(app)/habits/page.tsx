"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Flame, Plus, Loader2, X } from "lucide-react"

interface Habit {
  id: string
  name: string
  description: string | null
  category: string
  icon: string
  color: string
  streak: number
  completedToday: boolean
  logs: Array<{ date: string | Date }>
}

const CATEGORIES = ["health", "work", "personal", "finance"]
const ICONS = ["💪", "🏃", "🧘", "📚", "💻", "💰", "🥗", "💧", "😴", "🎯", "✍️", "🧠"]
const ANCHOR_MOMENTS = ["Morning", "Afternoon", "Evening", "Post-lunch", "Pre-sleep"]

function HabitCalendar({ logs }: { logs: Array<{ date: string | Date }> }) {
  const days = 28
  const now = new Date()
  return (
    <div>
      <div className="flex gap-0.5 mb-1">
        {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
          <div key={i} className="w-3 h-3 flex items-center justify-center">
            <span className="text-[8px]" style={{ fontFamily: '"IBM Plex Mono", monospace', color: "var(--text-muted)" }}>
              {d}
            </span>
          </div>
        ))}
      </div>
      <div className="grid gap-0.5" style={{ gridTemplateColumns: "repeat(7, 1fr)" }}>
        {Array.from({ length: days }, (_, i) => {
          const d = new Date()
          d.setDate(d.getDate() - (days - 1 - i))
          const dateStr = d.toISOString().split("T")[0]
          const logged = logs.some((l) => {
            const ld = new Date(l.date)
            return ld.toISOString().split("T")[0] === dateStr
          })
          const isFuture = d > now
          return (
            <div
              key={i}
              className="w-3 h-3 rounded-[2px]"
              style={{
                background: isFuture
                  ? "var(--border)"
                  : logged
                  ? "rgba(0,212,200,0.8)"
                  : "rgba(239,68,68,0.2)",
                border: "1px solid transparent",
              }}
              title={dateStr}
            />
          )
        })}
      </div>
    </div>
  )
}

export default function HabitsPage() {
  const [habits, setHabits] = useState<Habit[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [form, setForm] = useState({
    name: "",
    category: "health",
    icon: "💪",
    anchor: "Morning",
  })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetch("/api/habits")
      .then((r) => r.json())
      .then((data) => {
        setHabits(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  async function toggleHabit(habitId: string) {
    const res = await fetch(`/api/habits/${habitId}/log`, { method: "POST", body: JSON.stringify({}) })
    if (res.ok) {
      const refreshed = await fetch("/api/habits")
      const updated = await refreshed.json()
      setHabits(updated)
    }
  }

  async function createHabit() {
    setSaving(true)
    try {
      const res = await fetch("/api/habits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, color: "#00d4c8" }),
      })
      const newHabit = await res.json()
      setHabits((prev) => [...prev, { ...newHabit, completedToday: false }])
      setDialogOpen(false)
      setForm({ name: "", category: "health", icon: "💪", anchor: "Morning" })
    } catch {}
    setSaving(false)
  }

  const completedCount = habits.filter((h) => h.completedToday).length

  return (
    <div className="p-6 space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs tracking-wider text-[var(--text-muted)] mb-1 flex items-center gap-1.5"
            style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
            <Flame className="w-3.5 h-3.5" /> HABITS
          </p>
          <h1 className="text-3xl font-bold text-[var(--text-primary)]"
            style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
            Habit Tracker
          </h1>
          <p className="text-sm text-[var(--text-muted)] mt-1"
            style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
            {completedCount}/{habits.length} done today
          </p>
        </div>
        <button
          onClick={() => setDialogOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-[var(--radius-sm)] text-sm font-medium transition-colors"
          style={{ background: "var(--accent)", color: "var(--accent-foreground)" }}
        >
          <Plus className="w-4 h-4" />
          Add habit
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-5 h-5 animate-spin text-[var(--accent)]" />
        </div>
      ) : habits.length === 0 ? (
        <div
          className="p-12 rounded-[var(--radius-md)] text-center"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        >
          <Flame className="w-12 h-12 mx-auto mb-4" style={{ color: "var(--text-muted)" }} />
          <p className="text-[var(--text-muted)] mb-4">No habits tracked yet.</p>
          <button
            onClick={() => setDialogOpen(true)}
            className="px-4 py-2 rounded-[var(--radius-sm)] text-sm font-medium"
            style={{ background: "var(--accent)", color: "var(--accent-foreground)" }}
          >
            Add your first habit
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {habits.map((habit, i) => (
            <motion.div
              key={habit.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
            >
              <div
                className="p-5 rounded-[var(--radius-md)]"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                }}
              >
                {/* Top row */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{habit.icon}</span>
                    <div>
                      <p className="text-sm font-semibold text-[var(--text-primary)]">{habit.name}</p>
                      <span
                        className="text-[10px] px-1.5 py-0.5 rounded-[2px]"
                        style={{
                          background: "var(--surface-elevated)",
                          border: "1px solid var(--border)",
                          color: "var(--text-muted)",
                          fontFamily: '"IBM Plex Mono", monospace',
                          textTransform: "uppercase",
                        }}
                      >
                        Morning
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleHabit(habit.id)}
                    className="flex-shrink-0 transition-transform active:scale-110"
                  >
                    <div
                      className="w-12 h-12 rounded-full border-2 flex items-center justify-center"
                      style={{
                        background: habit.completedToday ? "var(--accent)" : "var(--surface-elevated)",
                        borderColor: habit.completedToday ? "var(--accent)" : "var(--border-strong)",
                      }}
                    >
                      <span
                        className="text-lg font-bold"
                        style={{
                          fontFamily: '"IBM Plex Mono", monospace',
                          color: habit.completedToday ? "var(--accent-foreground)" : "var(--text-secondary)",
                        }}
                      >
                        {habit.streak > 0 ? habit.streak : "0"}
                      </span>
                    </div>
                  </button>
                </div>

                {/* Streak number (big) */}
                <div className="mb-3">
                  <div className="flex items-baseline gap-1.5">
                    <span
                      className="text-5xl font-bold"
                      style={{ fontFamily: '"IBM Plex Mono", monospace', color: "var(--accent)" }}
                    >
                      {habit.streak > 0 ? `🔥 ${habit.streak}` : "0"}
                    </span>
                  </div>
                  <p
                    className="text-xs text-[var(--text-muted)] mt-0.5"
                    style={{ fontFamily: '"IBM Plex Mono", monospace' }}
                  >
                    {habit.streak === 1 ? "day streak" : "days streak"}
                  </p>
                </div>

                {/* 28-day calendar */}
                <HabitCalendar logs={habit.logs || []} />

                {/* Bottom info */}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-[var(--border)]">
                  <span className="text-xs text-[var(--text-muted)]"
                    style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
                    {habit.logs?.length || 0} logged this month
                  </span>
                  <div className="flex gap-3">
                    <button className="text-xs text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">
                      Edit
                    </button>
                    <button className="text-xs text-[var(--text-muted)] hover:text-[var(--destructive)] transition-colors">
                      Archive
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Habit science nudge */}
      <div
        className="p-4 rounded-[var(--radius-md)] flex items-start gap-3"
        style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
      >
        <span className="text-lg flex-shrink-0">📖</span>
        <div>
          <p className="text-sm text-[var(--text-secondary)] italic">
            &quot;Habits anchored to existing behaviors stick 40% longer. Your morning habits are anchored to waking up — that&apos;s the right move.&quot;
          </p>
          <p className="text-xs text-[var(--text-muted)] mt-1"
            style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
            Based on BJ Fogg&apos;s Tiny Habits framework
          </p>
        </div>
      </div>

      {/* Add Habit Modal */}
      {dialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => setDialogOpen(false)} />
          <div
            className="relative w-full max-w-md rounded-[var(--radius-lg)] p-6 z-10"
            style={{
              background: "var(--surface-elevated)",
              border: "1px solid var(--border-strong)",
              boxShadow: "var(--shadow-modal)",
            }}
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-[var(--text-primary)]">New Habit</h2>
              <button onClick={() => setDialogOpen(false)}
                className="text-[var(--text-muted)] hover:text-[var(--text-primary)]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="text-xs tracking-wider text-[var(--text-muted)] block mb-1.5"
                  style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
                  HABIT NAME
                </label>
                <input
                  type="text"
                  placeholder="e.g. Morning gym"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-[var(--radius-sm)] text-sm"
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    color: "var(--text-primary)",
                    outline: "none",
                  }}
                />
              </div>

              {/* Anchor moment */}
              <div>
                <label className="text-xs tracking-wider text-[var(--text-muted)] block mb-1.5"
                  style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
                  ANCHOR MOMENT
                </label>
                <div className="flex gap-2 flex-wrap">
                  {ANCHOR_MOMENTS.map((a) => (
                    <button
                      key={a}
                      onClick={() => setForm({ ...form, anchor: a })}
                      className="px-3 py-1.5 rounded-[var(--radius-sm)] text-xs transition-colors"
                      style={{
                        background: form.anchor === a ? "var(--accent-muted)" : "var(--surface)",
                        border: `1px solid ${form.anchor === a ? "var(--border-accent)" : "var(--border)"}`,
                        color: form.anchor === a ? "var(--accent)" : "var(--text-secondary)",
                      }}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>

              {/* Icon */}
              <div>
                <label className="text-xs tracking-wider text-[var(--text-muted)] block mb-1.5"
                  style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
                  ICON
                </label>
                <div className="flex gap-2 flex-wrap">
                  {ICONS.map((icon) => (
                    <button
                      key={icon}
                      onClick={() => setForm({ ...form, icon })}
                      className="w-9 h-9 rounded-[var(--radius-sm)] text-lg flex items-center justify-center transition-colors"
                      style={{
                        background: form.icon === icon ? "var(--accent-muted)" : "var(--surface)",
                        border: `1px solid ${form.icon === icon ? "var(--border-accent)" : "var(--border)"}`,
                      }}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={createHabit}
                disabled={!form.name || saving}
                className="w-full py-2.5 rounded-[var(--radius-sm)] text-sm font-semibold transition-colors mt-2 flex items-center justify-center gap-2"
                style={{
                  background: "var(--accent)",
                  color: "var(--accent-foreground)",
                  opacity: !form.name ? 0.6 : 1,
                }}
              >
                {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                {saving ? "Creating..." : "Create habit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

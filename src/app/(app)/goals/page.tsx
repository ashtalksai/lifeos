"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Target, Plus, ChevronRight, ChevronDown, Loader2, X } from "lucide-react"

interface Goal {
  id: string
  title: string
  timeframe: string
  category: string
  progress: number
  status: string
  parentId: string | null
  children?: Goal[]
}

const TIMEFRAMES = ["30yr", "5yr", "1yr", "quarterly", "monthly", "weekly"]
const TIMEFRAME_LABELS: Record<string, string> = {
  "30yr": "30YR",
  "5yr": "5YR",
  "1yr": "1YR",
  quarterly: "QUARTER",
  monthly: "MONTH",
  weekly: "WEEK",
}
const TIMEFRAME_COLORS: Record<string, string> = {
  "30yr": "var(--accent)",
  "5yr": "var(--info)",
  "1yr": "var(--success)",
  quarterly: "var(--warning)",
  monthly: "var(--text-secondary)",
  weekly: "var(--text-muted)",
}

function buildTree(goals: Goal[]): Goal[] {
  const map: Record<string, Goal> = {}
  goals.forEach((g) => { map[g.id] = { ...g, children: [] } })
  const roots: Goal[] = []
  goals.forEach((g) => {
    if (g.parentId && map[g.parentId]) {
      map[g.parentId].children!.push(map[g.id])
    } else {
      roots.push(map[g.id])
    }
  })
  return roots
}

function GoalNode({
  goal,
  depth = 0,
  onUpdate,
}: {
  goal: Goal
  depth?: number
  onUpdate: () => void
}) {
  const [expanded, setExpanded] = useState(depth < 2)
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState(goal.title)
  const hasChildren = goal.children && goal.children.length > 0

  const accentColor = TIMEFRAME_COLORS[goal.timeframe] || "var(--text-muted)"

  const handleTitleSave = async () => {
    if (title !== goal.title) {
      await fetch(`/api/goals/${goal.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      })
      onUpdate()
    }
    setEditing(false)
  }

  return (
    <div>
      <div
        className="group flex items-center gap-3 py-2.5 px-3 rounded-[var(--radius-sm)] transition-colors hover:bg-[var(--surface-hover)] cursor-pointer"
        style={{ paddingLeft: `${12 + depth * 24}px` }}
      >
        {/* Expand toggle */}
        <button
          onClick={(e) => { e.stopPropagation(); setExpanded(!expanded) }}
          className="flex-shrink-0 w-4 h-4 flex items-center justify-center text-[var(--text-muted)]"
        >
          {hasChildren ? (
            expanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />
          ) : (
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--border)]" />
          )}
        </button>

        {/* Left accent + timeframe */}
        <div
          className="w-0.5 h-5 rounded-full flex-shrink-0"
          style={{ background: accentColor }}
        />
        <span
          className="text-[10px] px-1.5 py-0.5 rounded-[2px] flex-shrink-0"
          style={{
            background: "var(--surface-elevated)",
            border: "1px solid var(--border)",
            color: accentColor,
            fontFamily: '"IBM Plex Mono", monospace',
          }}
        >
          {TIMEFRAME_LABELS[goal.timeframe] || goal.timeframe}
        </span>

        {/* Title */}
        <div className="flex-1 min-w-0">
          {editing ? (
            <input
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={handleTitleSave}
              onKeyDown={(e) => e.key === "Enter" && handleTitleSave()}
              className="w-full bg-transparent text-sm text-[var(--text-primary)] outline-none border-b border-[var(--accent)]"
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <p
              className="text-sm text-[var(--text-primary)] truncate"
              onClick={() => setEditing(true)}
            >
              {goal.title}
            </p>
          )}
        </div>

        {/* Progress */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="w-24 hidden md:block">
            <div className="h-1 rounded-full bg-[var(--surface-elevated)]">
              <div
                className="h-1 rounded-full transition-all"
                style={{ width: `${goal.progress}%`, background: accentColor }}
              />
            </div>
          </div>
          <span
            className="text-sm font-bold w-9 text-right"
            style={{ fontFamily: '"IBM Plex Mono", monospace', color: accentColor }}
          >
            {goal.progress}%
          </span>
          {hasChildren && (
            <span
              className="text-[10px] text-[var(--text-muted)] hidden md:block"
              style={{ fontFamily: '"IBM Plex Mono", monospace' }}
            >
              {goal.children!.length} sub
            </span>
          )}
        </div>
      </div>

      {/* Children */}
      {expanded && hasChildren && (
        <div className="relative">
          <div
            className="absolute top-0 bottom-0 w-px"
            style={{ left: `${12 + depth * 24 + 16}px`, background: "var(--border)" }}
          />
          {goal.children!.map((child) => (
            <GoalNode key={child.id} goal={child} depth={depth + 1} onUpdate={onUpdate} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [form, setForm] = useState({ title: "", timeframe: "1yr", parentId: "" })
  const [saving, setSaving] = useState(false)

  const load = () => {
    fetch("/api/goals")
      .then((r) => r.json())
      .then((data) => {
        setGoals(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const createGoal = async () => {
    setSaving(true)
    try {
      await fetch("/api/goals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          timeframe: form.timeframe,
          parentId: form.parentId || null,
        }),
      })
      load()
      setDialogOpen(false)
      setForm({ title: "", timeframe: "1yr", parentId: "" })
    } catch {}
    setSaving(false)
  }

  const tree = buildTree(goals)
  const activeGoals = goals.filter((g) => g.status === "active")

  return (
    <div className="p-6 space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs tracking-wider text-[var(--text-muted)] mb-1 flex items-center gap-1.5"
            style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
            <Target className="w-3.5 h-3.5" /> GOALS
          </p>
          <h1 className="text-3xl font-bold text-[var(--text-primary)]"
            style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
            Your Horizon
          </h1>
          <p className="text-sm text-[var(--text-muted)] mt-1"
            style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
            {activeGoals.length} active goals
          </p>
        </div>
        <button
          onClick={() => setDialogOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-[var(--radius-sm)] text-sm font-medium transition-colors"
          style={{ background: "var(--accent)", color: "var(--accent-foreground)" }}
        >
          <Plus className="w-4 h-4" />
          Add goal
        </button>
      </div>

      {/* Timeframe legend */}
      <div className="flex flex-wrap gap-3">
        {TIMEFRAMES.map((tf) => (
          <div key={tf} className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ background: TIMEFRAME_COLORS[tf] }} />
            <span className="text-xs text-[var(--text-muted)]"
              style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
              {TIMEFRAME_LABELS[tf]}
            </span>
          </div>
        ))}
      </div>

      {/* Goals tree */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-5 h-5 animate-spin text-[var(--accent)]" />
        </div>
      ) : tree.length === 0 ? (
        <div
          className="p-12 rounded-[var(--radius-md)] text-center"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        >
          <Target className="w-12 h-12 mx-auto mb-4" style={{ color: "var(--text-muted)" }} />
          <p className="text-[var(--text-primary)] font-medium mb-2">What are you building toward?</p>
          <p className="text-sm text-[var(--text-muted)] mb-4">Start with your 30-year vision, then break it down.</p>
          <button
            onClick={() => setDialogOpen(true)}
            className="px-4 py-2 rounded-[var(--radius-sm)] text-sm font-medium"
            style={{ background: "var(--accent)", color: "var(--accent-foreground)" }}
          >
            Add your first goal
          </button>
        </div>
      ) : (
        <div
          className="rounded-[var(--radius-md)] overflow-hidden"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        >
          {tree.map((goal) => (
            <div key={goal.id} className="border-b border-[var(--border)] last:border-0">
              <GoalNode goal={goal} onUpdate={load} />
            </div>
          ))}
        </div>
      )}

      {/* Add Goal Modal */}
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
              <h2 className="text-xl font-bold text-[var(--text-primary)]">New Goal</h2>
              <button onClick={() => setDialogOpen(false)}
                className="text-[var(--text-muted)] hover:text-[var(--text-primary)]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Title */}
              <div>
                <label className="text-xs tracking-wider text-[var(--text-muted)] block mb-1.5"
                  style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
                  WHAT&apos;S THE GOAL?
                </label>
                <input
                  type="text"
                  placeholder="e.g. Become financially independent"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-[var(--radius-sm)] text-sm"
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    color: "var(--text-primary)",
                    outline: "none",
                  }}
                />
              </div>

              {/* Timeframe */}
              <div>
                <label className="text-xs tracking-wider text-[var(--text-muted)] block mb-1.5"
                  style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
                  WHAT TIMEFRAME?
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {TIMEFRAMES.map((tf) => (
                    <button
                      key={tf}
                      onClick={() => setForm({ ...form, timeframe: tf })}
                      className="py-2 rounded-[var(--radius-sm)] text-xs font-medium transition-colors"
                      style={{
                        background: form.timeframe === tf ? "var(--accent-muted)" : "var(--surface)",
                        border: `1px solid ${form.timeframe === tf ? "var(--border-accent)" : "var(--border)"}`,
                        color: form.timeframe === tf ? "var(--accent)" : "var(--text-secondary)",
                        fontFamily: '"IBM Plex Mono", monospace',
                      }}
                    >
                      {TIMEFRAME_LABELS[tf]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Parent goal (optional) */}
              {goals.length > 0 && (
                <div>
                  <label className="text-xs tracking-wider text-[var(--text-muted)] block mb-1.5"
                    style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
                    PART OF A BIGGER GOAL? (OPTIONAL)
                  </label>
                  <select
                    value={form.parentId}
                    onChange={(e) => setForm({ ...form, parentId: e.target.value })}
                    className="w-full px-3 py-2 rounded-[var(--radius-sm)] text-sm"
                    style={{
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                      color: form.parentId ? "var(--text-primary)" : "var(--text-muted)",
                      outline: "none",
                    }}
                  >
                    <option value="">None</option>
                    {goals.map((g) => (
                      <option key={g.id} value={g.id}>{g.title}</option>
                    ))}
                  </select>
                </div>
              )}

              <button
                onClick={createGoal}
                disabled={!form.title || saving}
                className="w-full py-2.5 rounded-[var(--radius-sm)] text-sm font-semibold transition-colors mt-2 flex items-center justify-center gap-2"
                style={{
                  background: "var(--accent)",
                  color: "var(--accent-foreground)",
                  opacity: !form.title ? 0.6 : 1,
                }}
              >
                {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                {saving ? "Creating..." : "Create goal"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

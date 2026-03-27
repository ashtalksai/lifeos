"use client"

import { useState } from "react"
import { Briefcase, ExternalLink, AlertTriangle, CheckCircle, Clock, Plus } from "lucide-react"

const trelloCards = [
  { name: "🧠 Life OS — Stage 4 Build", labels: ["@build", "@coder"], stuck: false },
  { name: "Stravix growth plan — AppSumo", labels: ["Stravix", "Growth"], stuck: false },
  { name: "Gradient: AI automation week 12", labels: ["Gradient"], stuck: false },
  { name: "Polymarket trading system", labels: ["Trading"], stuck: true },
]

const recentlyDone = [
  "✅ Reclaimd deployed to ashketing.com",
  "✅ Gradient sprint 11 — AI chatbot delivered",
  "✅ Stravix onboarding flow rework",
]

const stravixKpis = [
  { label: "MRR", value: "€0", trend: null },
  { label: "Users", value: "47", trend: "+3" },
  { label: "Signups this week", value: "12", trend: "+12" },
]

export default function WorkPage() {
  const [kpiModalOpen, setKpiModalOpen] = useState(false)

  return (
    <div className="p-6 space-y-6 max-w-5xl">
      {/* Header */}
      <div>
        <p className="text-xs tracking-wider text-[var(--text-muted)] mb-1 flex items-center gap-1.5"
          style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
          <Briefcase className="w-3.5 h-3.5" /> WORK
        </p>
        <h1 className="text-3xl font-bold text-[var(--text-primary)]"
          style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
          Work Dashboard
        </h1>
      </div>

      {/* 3-col grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Gradient Sprint */}
        <div className="p-5 rounded-[var(--radius-md)]"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
          <p className="text-xs tracking-wider text-[var(--text-muted)] mb-4"
            style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
            GRADIENT
          </p>
          <div className="mb-4">
            <p className="text-sm font-medium text-[var(--text-secondary)] mb-3"
              style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
              Sprint W13
            </p>
            <div className="flex justify-between text-xs mb-1.5"
              style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
              <span className="text-[var(--text-muted)]">Hours logged</span>
              <span className="text-[var(--text-primary)]">6h / 12h</span>
            </div>
            <div className="h-1.5 rounded-full bg-[var(--surface-elevated)]">
              <div className="h-1.5 rounded-full bg-[var(--accent)]" style={{ width: "50%" }} />
            </div>
          </div>
          <div className="space-y-1.5">
            <p className="text-xs tracking-wider text-[var(--text-muted)] mb-2"
              style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
              THIS SPRINT
            </p>
            {["AI chatbot integration", "Automation workflow design", "Client documentation"].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-[var(--text-muted)] flex-shrink-0" />
                <span className="text-xs text-[var(--text-secondary)]">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Trello Pipeline */}
        <div className="p-5 rounded-[var(--radius-md)]"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs tracking-wider text-[var(--text-muted)]"
              style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
              PIPELINE
            </p>
            <a
              href="https://trello.com/b/YpwTGFEg/jarvis-hq"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-[var(--accent)] hover:text-[var(--accent-hover)]"
              style={{ fontFamily: '"IBM Plex Mono", monospace' }}
            >
              <ExternalLink className="w-3 h-3" />
              Open Trello
            </a>
          </div>

          <div className="space-y-2 mb-4">
            <p className="text-xs tracking-wider text-[var(--text-muted)] mb-2"
              style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
              DOING ({trelloCards.length})
            </p>
            {trelloCards.map((card) => (
              <div key={card.name}
                className="px-3 py-2 rounded-[var(--radius-sm)]"
                style={{
                  background: card.stuck ? "rgba(245,158,11,0.05)" : "var(--surface-elevated)",
                  border: `1px solid ${card.stuck ? "rgba(245,158,11,0.3)" : "var(--border)"}`,
                }}>
                <div className="flex items-start gap-2">
                  {card.stuck && <AlertTriangle className="w-3 h-3 text-[var(--warning)] flex-shrink-0 mt-0.5" />}
                  <p className="text-xs text-[var(--text-primary)] leading-tight"
                    style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
                    {card.name}
                  </p>
                </div>
                <div className="flex gap-1 mt-1.5">
                  {card.labels.map((lbl) => (
                    <span key={lbl} className="text-[10px] px-1.5 py-0.5 rounded-[2px]"
                      style={{
                        background: "var(--surface)",
                        border: "1px solid var(--border)",
                        color: "var(--text-muted)",
                        fontFamily: '"IBM Plex Mono", monospace',
                      }}>
                      {lbl}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div>
            <p className="text-xs tracking-wider text-[var(--text-muted)] mb-2"
              style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
              RECENTLY DONE
            </p>
            {recentlyDone.map((item) => (
              <p key={item} className="text-xs text-[var(--text-secondary)] py-1 border-b border-[var(--border)] last:border-0"
                style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
                {item}
              </p>
            ))}
          </div>
        </div>

        {/* Stravix */}
        <div className="p-5 rounded-[var(--radius-md)]"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs tracking-wider text-[var(--text-muted)]"
              style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
              STRAVIX
            </p>
            <button
              onClick={() => setKpiModalOpen(true)}
              className="flex items-center gap-1 text-xs text-[var(--accent)] hover:text-[var(--accent-hover)]"
              style={{ fontFamily: '"IBM Plex Mono", monospace' }}
            >
              <Plus className="w-3 h-3" />
              Update KPIs
            </button>
          </div>

          <div className="space-y-4">
            {stravixKpis.map((kpi) => (
              <div key={kpi.label} className="flex items-center justify-between">
                <span className="text-xs text-[var(--text-muted)]"
                  style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
                  {kpi.label}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold"
                    style={{ fontFamily: '"IBM Plex Mono", monospace', color: "var(--text-primary)" }}>
                    {kpi.value}
                  </span>
                  {kpi.trend && (
                    <span className="text-xs"
                      style={{
                        fontFamily: '"IBM Plex Mono", monospace',
                        color: kpi.trend.startsWith("+") ? "var(--success)" : "var(--destructive)",
                      }}>
                      {kpi.trend}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-[var(--text-muted)] mt-4"
            style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
            Last updated: today
          </p>
        </div>
      </div>

      {/* KPI Update Modal */}
      {kpiModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => setKpiModalOpen(false)} />
          <div className="relative w-full max-w-sm rounded-[var(--radius-lg)] p-6 z-10"
            style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-strong)", boxShadow: "var(--shadow-modal)" }}>
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-5">Update Stravix KPIs</h2>
            <div className="space-y-4">
              {["MRR (€)", "Total Users", "New Signups This Week"].map((field) => (
                <div key={field}>
                  <label className="text-xs tracking-wider text-[var(--text-muted)] block mb-1.5"
                    style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
                    {field.toUpperCase()}
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 rounded-[var(--radius-sm)] text-sm"
                    style={{
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                      color: "var(--text-primary)",
                      outline: "none",
                    }}
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-5">
              <button
                onClick={() => setKpiModalOpen(false)}
                className="flex-1 py-2 rounded-[var(--radius-sm)] text-sm font-medium"
                style={{ background: "var(--accent)", color: "var(--accent-foreground)" }}>
                Save KPIs
              </button>
              <button onClick={() => setKpiModalOpen(false)}
                className="px-4 py-2 rounded-[var(--radius-sm)] text-sm"
                style={{ border: "1px solid var(--border)", color: "var(--text-secondary)" }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

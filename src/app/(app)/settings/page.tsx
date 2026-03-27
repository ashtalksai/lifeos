"use client"

import { useState } from "react"
import { Settings, Link2, CheckSquare, Brain, DollarSign, User, ChevronRight, Check, Loader } from "lucide-react"

const settingsSections = [
  { id: "connections", label: "Connections", icon: Link2 },
  { id: "checkin", label: "Check-in", icon: CheckSquare },
  { id: "ai", label: "AI Settings", icon: Brain },
  { id: "baseline", label: "Baseline", icon: DollarSign },
  { id: "account", label: "Account", icon: User },
]

const integrations = [
  { name: "Trello", status: "connected", logo: "T" },
  { name: "Simplicate", status: "disconnected", logo: "S" },
]

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("connections")
  const [saved, setSaved] = useState(false)
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    await new Promise((r) => setTimeout(r, 800))
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="p-6 max-w-5xl">
      {/* Header */}
      <div className="mb-6">
        <p className="text-xs tracking-wider text-[var(--text-muted)] mb-1 flex items-center gap-1.5"
          style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
          <Settings className="w-3.5 h-3.5" /> SETTINGS
        </p>
        <h1 className="text-3xl font-bold text-[var(--text-primary)]"
          style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
          Configuration
        </h1>
      </div>

      <div className="flex gap-6">
        {/* Left nav */}
        <div className="w-48 flex-shrink-0">
          <div className="rounded-[var(--radius-md)] overflow-hidden"
            style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
            {settingsSections.map((section) => {
              const Icon = section.icon
              const active = activeSection === section.id
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className="flex items-center gap-2.5 w-full px-4 py-3 text-sm transition-colors text-left border-b border-[var(--border)] last:border-0"
                  style={{
                    background: active ? "var(--accent-muted)" : "transparent",
                    color: active ? "var(--accent)" : "var(--text-secondary)",
                    borderLeft: active ? "2px solid var(--accent)" : "2px solid transparent",
                  }}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  {section.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Right panel */}
        <div className="flex-1">
          {/* Connections */}
          {activeSection === "connections" && (
            <div className="rounded-[var(--radius-md)] p-6"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-5">Data Connections</h2>
              <div className="space-y-4">
                {integrations.map((int) => (
                  <div key={int.name}
                    className="flex items-center justify-between p-4 rounded-[var(--radius-sm)]"
                    style={{ background: "var(--surface-elevated)", border: "1px solid var(--border)" }}>
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-[var(--radius-sm)] flex items-center justify-center font-bold text-sm"
                        style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text-primary)" }}>
                        {int.logo}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[var(--text-primary)]">{int.name}</p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <div
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ background: int.status === "connected" ? "var(--success)" : "var(--destructive)" }}
                          />
                          <span className="text-xs capitalize"
                            style={{
                              fontFamily: '"IBM Plex Mono", monospace',
                              color: int.status === "connected" ? "var(--success)" : "var(--destructive)",
                            }}>
                            {int.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      className="px-3 py-1.5 rounded-[var(--radius-sm)] text-xs font-medium transition-colors"
                      style={{
                        border: "1px solid var(--border)",
                        color: int.status === "connected" ? "var(--text-muted)" : "var(--accent)",
                        borderColor: int.status === "connected" ? "var(--border)" : "var(--border-accent)",
                      }}>
                      {int.status === "connected" ? "Disconnect" : "Connect →"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Check-in */}
          {activeSection === "checkin" && (
            <div className="rounded-[var(--radius-md)] p-6"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-5">Daily Check-in</h2>
              <div className="space-y-5">
                <div>
                  <label className="text-xs tracking-wider text-[var(--text-muted)] block mb-2"
                    style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
                    CHECK-IN REMINDER TIME
                  </label>
                  <input type="time" defaultValue="07:00"
                    className="px-3 py-2 rounded-[var(--radius-sm)] text-sm"
                    style={{
                      background: "var(--surface-elevated)",
                      border: "1px solid var(--border)",
                      color: "var(--text-primary)",
                      outline: "none",
                      fontFamily: '"IBM Plex Mono", monospace',
                    }} />
                </div>
                <div>
                  <label className="text-xs tracking-wider text-[var(--text-muted)] block mb-2"
                    style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
                    HABITS TO TRACK
                  </label>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Manage your habits on the{" "}
                    <a href="/habits" className="text-[var(--accent)] hover:underline">
                      Habits page →
                    </a>
                  </p>
                </div>
                <button onClick={handleSave}
                  className="flex items-center gap-2 px-4 py-2 rounded-[var(--radius-sm)] text-sm font-medium transition-colors"
                  style={{ background: "var(--accent)", color: "var(--accent-foreground)" }}>
                  {saving ? <Loader className="w-4 h-4 animate-spin" /> : saved ? <Check className="w-4 h-4" /> : null}
                  {saving ? "Saving..." : saved ? "Saved!" : "Save changes"}
                </button>
              </div>
            </div>
          )}

          {/* AI Settings */}
          {activeSection === "ai" && (
            <div className="rounded-[var(--radius-md)] p-6"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-5">AI Settings</h2>
              <div className="space-y-5">
                <div>
                  <label className="text-xs tracking-wider text-[var(--text-muted)] block mb-2"
                    style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
                    MORNING BRIEF TIME
                  </label>
                  <input type="time" defaultValue="07:00"
                    className="px-3 py-2 rounded-[var(--radius-sm)] text-sm"
                    style={{
                      background: "var(--surface-elevated)",
                      border: "1px solid var(--border)",
                      color: "var(--text-primary)",
                      outline: "none",
                      fontFamily: '"IBM Plex Mono", monospace',
                    }} />
                  <p className="text-xs text-[var(--text-muted)] mt-1.5">Claude analyzes your data nightly and has your brief ready by this time</p>
                </div>
                <div>
                  <label className="text-xs tracking-wider text-[var(--text-muted)] block mb-2"
                    style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
                    NUDGE FREQUENCY
                  </label>
                  <div className="flex gap-2">
                    {["Off", "Daily", "Smart"].map((opt) => (
                      <button key={opt}
                        className="px-4 py-2 rounded-[var(--radius-sm)] text-sm font-medium transition-colors"
                        style={{
                          background: opt === "Smart" ? "var(--accent)" : "var(--surface-elevated)",
                          color: opt === "Smart" ? "var(--accent-foreground)" : "var(--text-secondary)",
                          border: `1px solid ${opt === "Smart" ? "var(--accent)" : "var(--border)"}`,
                        }}>
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs tracking-wider text-[var(--text-muted)] block mb-2"
                    style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
                    TELEGRAM NOTIFICATIONS
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-5 rounded-full relative cursor-pointer"
                      style={{ background: "var(--accent)" }}>
                      <div className="absolute right-0.5 top-0.5 w-4 h-4 rounded-full bg-white" />
                    </div>
                    <span className="text-sm text-[var(--text-secondary)]">Enabled</span>
                  </div>
                </div>
                <button onClick={handleSave}
                  className="flex items-center gap-2 px-4 py-2 rounded-[var(--radius-sm)] text-sm font-medium transition-colors"
                  style={{ background: "var(--accent)", color: "var(--accent-foreground)" }}>
                  {saving ? <Loader className="w-4 h-4 animate-spin" /> : saved ? <Check className="w-4 h-4" /> : null}
                  {saving ? "Saving..." : saved ? "Saved!" : "Save changes"}
                </button>
              </div>
            </div>
          )}

          {/* Baseline */}
          {activeSection === "baseline" && (
            <div className="rounded-[var(--radius-md)] p-6"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-5">Baseline Data</h2>
              <div className="space-y-4">
                {[
                  { label: "MONTHLY INCOME (€)", defaultValue: "4000" },
                  { label: "FIXED EXPENSES (€)", defaultValue: "1200" },
                  { label: "STARTING DEBT (€)", defaultValue: "50000" },
                ].map((field) => (
                  <div key={field.label}>
                    <label className="text-xs tracking-wider text-[var(--text-muted)] block mb-1.5"
                      style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
                      {field.label}
                    </label>
                    <input type="number" defaultValue={field.defaultValue}
                      className="w-full px-3 py-2 rounded-[var(--radius-sm)] text-sm"
                      style={{
                        background: "var(--surface-elevated)",
                        border: "1px solid var(--border)",
                        color: "var(--text-primary)",
                        outline: "none",
                        fontFamily: '"IBM Plex Mono", monospace',
                      }} />
                  </div>
                ))}
                <button onClick={handleSave}
                  className="flex items-center gap-2 px-4 py-2 rounded-[var(--radius-sm)] text-sm font-medium transition-colors mt-2"
                  style={{ background: "var(--accent)", color: "var(--accent-foreground)" }}>
                  {saving ? <Loader className="w-4 h-4 animate-spin" /> : saved ? <Check className="w-4 h-4" /> : null}
                  {saving ? "Saving..." : saved ? "Saved!" : "Save baseline"}
                </button>
              </div>
            </div>
          )}

          {/* Account */}
          {activeSection === "account" && (
            <div className="space-y-4">
              <div className="rounded-[var(--radius-md)] p-6"
                style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
                <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-5">Account</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs tracking-wider text-[var(--text-muted)] block mb-1.5"
                      style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
                      EMAIL
                    </label>
                    <input type="email" disabled value="ashkanhatef@gmail.com"
                      className="w-full px-3 py-2 rounded-[var(--radius-sm)] text-sm"
                      style={{
                        background: "var(--surface-elevated)",
                        border: "1px solid var(--border)",
                        color: "var(--text-muted)",
                        fontFamily: '"IBM Plex Mono", monospace',
                      }} />
                  </div>
                  <button
                    className="px-4 py-2 rounded-[var(--radius-sm)] text-sm font-medium transition-colors"
                    style={{ border: "1px solid var(--border-accent)", color: "var(--accent)" }}>
                    Change password →
                  </button>
                </div>
              </div>

              {/* Danger zone */}
              <div className="rounded-[var(--radius-md)] p-6"
                style={{
                  background: "rgba(239,68,68,0.03)",
                  border: "1px solid rgba(239,68,68,0.2)",
                }}>
                <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--destructive)" }}>
                  Danger Zone
                </h3>
                <p className="text-sm text-[var(--text-muted)] mb-4">
                  Permanently delete your account and all associated data. This cannot be undone.
                </p>
                <button
                  className="px-4 py-2 rounded-[var(--radius-sm)] text-sm font-medium"
                  style={{
                    background: "rgba(239,68,68,0.1)",
                    border: "1px solid rgba(239,68,68,0.4)",
                    color: "var(--destructive)",
                  }}>
                  Delete account and all data
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

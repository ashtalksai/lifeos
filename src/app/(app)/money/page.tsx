"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  DollarSign,
  TrendingDown,
  TrendingUp,
  Plus,
} from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts"

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="px-3 py-2 rounded-[4px] text-xs"
        style={{
          background: "var(--surface-elevated)",
          border: "1px solid var(--border-strong)",
          fontFamily: '"IBM Plex Mono", monospace',
          color: "var(--text-primary)",
        }}>
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

// Mock 6-month debt velocity data
const debtData = [
  { month: "Oct", debt: 49200 },
  { month: "Nov", debt: 48800 },
  { month: "Dec", debt: 48500 },
  { month: "Jan", debt: 48100 },
  { month: "Feb", debt: 47800 },
  { month: "Mar", debt: 47200 },
]

// Mock monthly comparison
const monthlyData = [
  { month: "Feb", income: 4000, expenses: 1920 },
  { month: "Mar", income: 4000, expenses: 1840 },
]

const incomeStreams = [
  { name: "Gradient (Salary)", hours: "40h / week", amount: "€4,000" },
  { name: "Stravix MRR", hours: "—", amount: "€0" },
  { name: "Freelance", hours: "—", amount: "€0" },
]

export default function MoneyPage() {
  const [showInput, setShowInput] = useState(false)

  const income = 4000
  const fixedExpenses = 1200
  const variableExpenses = 640
  const totalExpenses = fixedExpenses + variableExpenses
  const remaining = income - totalExpenses
  const burnRate = Math.round((totalExpenses / income) * 100)
  const debtBalance = 47200
  const monthlyPaydown = 320
  const monthsToFree = Math.ceil(debtBalance / monthlyPaydown)

  return (
    <div className="p-6 space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs tracking-wider text-[var(--text-muted)] mb-1 flex items-center gap-1.5"
            style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
            <DollarSign className="w-3.5 h-3.5" /> MONEY
          </p>
          <h1 className="text-3xl font-bold text-[var(--text-primary)]"
            style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
            Money Dashboard
          </h1>
        </div>
        <button
          onClick={() => setShowInput(!showInput)}
          className="flex items-center gap-2 px-4 py-2 rounded-[var(--radius-sm)] text-sm font-medium transition-colors"
          style={{
            background: "var(--accent)",
            color: "var(--accent-foreground)",
          }}
        >
          <Plus className="w-4 h-4" />
          Log numbers
        </button>
      </div>

      {/* Monthly Overview — 3 stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "INCOME", value: `€${income.toLocaleString()}`, color: "var(--success)", sub: "this month" },
          { label: "EXPENSES", value: `€${totalExpenses.toLocaleString()}`, color: "var(--text-primary)", sub: "fixed + variable" },
          { label: "REMAINING", value: `€${remaining.toLocaleString()}`, color: remaining > 0 ? "var(--accent)" : "var(--destructive)", sub: "left this month" },
        ].map((stat) => (
          <div key={stat.label} className="p-5 rounded-[var(--radius-md)]"
            style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
            <p className="text-xs tracking-wider text-[var(--text-muted)] mb-2"
              style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
              {stat.label}
            </p>
            <p className="text-4xl font-bold mb-1"
              style={{ fontFamily: '"IBM Plex Mono", monospace', color: stat.color }}>
              {stat.value}
            </p>
            <p className="text-xs text-[var(--text-muted)]">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Burn Rate Bar */}
      <div className="p-5 rounded-[var(--radius-md)]"
        style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
        <div className="flex justify-between text-xs mb-2"
          style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
          <span className="text-[var(--text-muted)]">BURN RATE</span>
          <span style={{ color: burnRate < 70 ? "var(--success)" : burnRate < 90 ? "var(--warning)" : "var(--destructive)" }}>
            {burnRate}% of income
          </span>
        </div>
        <div className="h-2 rounded-full bg-[var(--surface-elevated)]">
          <div
            className="h-2 rounded-full transition-all"
            style={{
              width: `${burnRate}%`,
              background: burnRate < 70 ? "var(--success)" : burnRate < 90 ? "var(--warning)" : "var(--destructive)",
            }}
          />
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <ResponsiveContainer width="100%" height={100}>
            <BarChart data={monthlyData} margin={{ top: 0, right: 0, bottom: 0, left: -10 }}>
              <XAxis dataKey="month" tick={{ fontSize: 10, fontFamily: '"IBM Plex Mono", monospace', fill: "var(--text-muted)" }} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fontFamily: '"IBM Plex Mono", monospace', fill: "var(--text-muted)" }} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="income" fill="rgba(34,197,94,0.7)" radius={[2, 2, 0, 0]} name="income" />
              <Bar dataKey="expenses" fill="rgba(0,212,200,0.5)" radius={[2, 2, 0, 0]} name="expenses" />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex flex-col justify-center space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-[2px]" style={{ background: "rgba(34,197,94,0.7)" }} />
              <span className="text-xs text-[var(--text-muted)]">Income</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-[2px]" style={{ background: "rgba(0,212,200,0.5)" }} />
              <span className="text-xs text-[var(--text-muted)]">Expenses</span>
            </div>
          </div>
        </div>
      </div>

      {/* Debt Tracker */}
      <div className="p-5 rounded-[var(--radius-md)]"
        style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
        <p className="text-xs tracking-wider text-[var(--text-muted)] mb-4"
          style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
          DEBT PAYDOWN
        </p>
        <div className="flex items-start gap-8 mb-4">
          <div>
            <p className="text-5xl font-bold"
              style={{ fontFamily: '"IBM Plex Mono", monospace', color: "var(--destructive)" }}>
              €{debtBalance.toLocaleString()}
            </p>
            <p className="text-sm text-[var(--text-muted)] mt-1">total remaining</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[var(--success)]">
              <TrendingDown className="w-4 h-4" />
              <span className="font-mono text-lg font-bold" style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
                ↓ €{monthlyPaydown}
              </span>
              <span className="text-sm text-[var(--text-muted)]">this month</span>
            </div>
            <p className="text-lg font-bold"
              style={{ fontFamily: '"IBM Plex Mono", monospace', color: "var(--accent)" }}>
              Debt-free in: {monthsToFree} months
            </p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={120}>
          <LineChart data={debtData} margin={{ top: 0, right: 0, bottom: 0, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(30,45,74,0.5)" />
            <XAxis dataKey="month" tick={{ fontSize: 10, fontFamily: '"IBM Plex Mono", monospace', fill: "var(--text-muted)" }} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fontFamily: '"IBM Plex Mono", monospace', fill: "var(--text-muted)" }} tickLine={false} domain={['dataMin - 500', 'dataMax + 500']} />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="debt" stroke="#ef4444" strokeWidth={1.5} dot={{ r: 3, fill: "#ef4444" }} name="€ debt" />
          </LineChart>
        </ResponsiveContainer>
        <p className="text-xs text-[var(--text-secondary)] mt-3">
          You&apos;ve paid off <span className="text-[var(--success)] font-semibold">€2,800</span> since tracking started
        </p>
      </div>

      {/* Income Streams */}
      <div>
        <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4"
          style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
          Income Streams
        </h2>
        <div className="rounded-[var(--radius-md)] overflow-hidden"
          style={{ border: "1px solid var(--border)" }}>
          {incomeStreams.map((stream, i) => (
            <div
              key={stream.name}
              className="flex items-center justify-between px-5 py-3.5"
              style={{
                background: "var(--surface)",
                borderBottom: i < incomeStreams.length - 1 ? "1px solid var(--border)" : "none",
              }}
            >
              <span className="text-sm text-[var(--text-primary)] font-medium"
                style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
                {stream.name}
              </span>
              <div className="flex items-center gap-8">
                <span className="text-xs text-[var(--text-muted)]"
                  style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
                  {stream.hours}
                </span>
                <span className="text-sm font-bold"
                  style={{
                    fontFamily: '"IBM Plex Mono", monospace',
                    color: stream.amount === "€0" ? "var(--text-muted)" : "var(--success)",
                  }}>
                  {stream.amount}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Input Modal */}
      {showInput && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowInput(false)} />
          <div className="relative w-full max-w-md rounded-[var(--radius-lg)] p-6 z-10"
            style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-strong)", boxShadow: "var(--shadow-modal)" }}>
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-5">Log This Month&apos;s Numbers</h2>
            <div className="space-y-4">
              {["Income received", "Variable expenses", "Debt payment made", "Notes"].map((field) => (
                <div key={field}>
                  <label className="text-xs tracking-wider text-[var(--text-muted)] block mb-1.5"
                    style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
                    {field.toUpperCase()}
                  </label>
                  {field === "Notes" ? (
                    <textarea
                      className="w-full px-3 py-2 rounded-[var(--radius-sm)] text-sm resize-none"
                      rows={3}
                      style={{
                        background: "var(--surface)",
                        border: "1px solid var(--border)",
                        color: "var(--text-primary)",
                        outline: "none",
                      }}
                    />
                  ) : (
                    <input
                      type="number"
                      className="w-full px-3 py-2 rounded-[var(--radius-sm)] text-sm"
                      placeholder="€0"
                      style={{
                        background: "var(--surface)",
                        border: "1px solid var(--border)",
                        color: "var(--text-primary)",
                        outline: "none",
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-5">
              <button
                onClick={() => setShowInput(false)}
                className="flex-1 py-2 rounded-[var(--radius-sm)] text-sm font-medium transition-colors"
                style={{ background: "var(--accent)", color: "var(--accent-foreground)" }}>
                Save
              </button>
              <button onClick={() => setShowInput(false)}
                className="px-4 py-2 rounded-[var(--radius-sm)] text-sm transition-colors"
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

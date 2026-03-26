"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, TrendingUp, Save, Moon, Dumbbell, Droplets, Flame } from "lucide-react"

interface Metric {
  id: string
  date: string | Date
  type: string
  value: number
}

const METRIC_CONFIGS = [
  { type: "sleep_hours", label: "Sleep", unit: "hrs", icon: Moon, placeholder: "7.5", color: "text-blue-400" },
  { type: "gym_done", label: "Gym", unit: "(1=yes)", icon: Dumbbell, placeholder: "1", color: "text-green-400" },
  { type: "water_glasses", label: "Water", unit: "glasses", icon: Droplets, placeholder: "8", color: "text-cyan-400" },
  { type: "calories", label: "Calories", unit: "kcal", icon: Flame, placeholder: "2000", color: "text-orange-400" },
  { type: "mood", label: "Mood", unit: "/5", icon: TrendingUp, placeholder: "4", color: "text-purple-400" },
  { type: "energy", label: "Energy", unit: "/5", icon: TrendingUp, placeholder: "3", color: "text-yellow-400" },
]

export default function MetricsPage() {
  const [metrics, setMetrics] = useState<Metric[]>([])
  const [loading, setLoading] = useState(true)
  const [values, setValues] = useState<Record<string, string>>({})
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const today = new Date().toISOString().split("T")[0]

  useEffect(() => {
    fetch("/api/metrics?days=30")
      .then((r) => r.json())
      .then((data) => {
        setMetrics(data)
        // Pre-fill today's values
        const todayMetrics = data.filter((m: Metric) => {
          const d = new Date(m.date)
          return d.toISOString().split("T")[0] === today
        })
        const vals: Record<string, string> = {}
        todayMetrics.forEach((m: Metric) => {
          vals[m.type] = m.value.toString()
        })
        setValues(vals)
        setLoading(false)
      })
  }, [today])

  async function saveMetrics() {
    setSaving(true)
    for (const [type, value] of Object.entries(values)) {
      if (value) {
        await fetch("/api/metrics", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ date: today, type, value }),
        })
      }
    }
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
    // Refetch
    const res = await fetch("/api/metrics?days=30")
    setMetrics(await res.json())
  }

  // Get last 7 days for trend
  function getRecentValues(type: string) {
    const sorted = metrics
      .filter((m) => m.type === type)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 7)
      .reverse()
    return sorted
  }

  return (
    <div className="p-6 space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-green-400" />
            Metrics
          </h1>
          <p className="text-sm text-muted-foreground">Track your daily health & performance data</p>
        </div>
      </div>

      {/* Today's log */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Log Today</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            {METRIC_CONFIGS.map(({ type, label, unit, icon: Icon, placeholder, color }) => (
              <div key={type} className="space-y-1.5">
                <label className={`text-xs font-medium flex items-center gap-1.5 ${color}`}>
                  <Icon className="w-3.5 h-3.5" />
                  {label} <span className="text-muted-foreground">({unit})</span>
                </label>
                <Input
                  type="number"
                  placeholder={placeholder}
                  value={values[type] || ""}
                  onChange={(e) => setValues({ ...values, [type]: e.target.value })}
                  className="bg-secondary/50 h-9 text-sm"
                  step="0.1"
                />
              </div>
            ))}
          </div>
          <Button onClick={saveMetrics} disabled={saving} className="gap-2 w-full">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saved ? "Saved!" : "Save Today's Data"}
          </Button>
        </CardContent>
      </Card>

      {/* Trends */}
      {!loading && metrics.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-medium text-muted-foreground">7-Day Trend</h2>
          <div className="grid grid-cols-1 gap-3">
            {METRIC_CONFIGS.filter(({ type }) => getRecentValues(type).length > 0).map(({ type, label, unit, icon: Icon, color }) => {
              const vals = getRecentValues(type)
              const avg = vals.length > 0 ? (vals.reduce((s, m) => s + m.value, 0) / vals.length).toFixed(1) : null
              const maxVal = Math.max(...vals.map(m => m.value))
              return (
                <Card key={type} className="bg-card border-border">
                  <CardContent className="py-3 px-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className={`flex items-center gap-1.5 text-sm font-medium ${color}`}>
                        <Icon className="w-4 h-4" />
                        {label}
                      </div>
                      {avg && (
                        <span className="text-xs text-muted-foreground">avg {avg} {unit}</span>
                      )}
                    </div>
                    <div className="flex gap-1 items-end h-8">
                      {vals.map((m, i) => {
                        const height = maxVal > 0 ? (m.value / maxVal) * 100 : 0
                        return (
                          <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                            <div
                              className={`w-full rounded-sm transition-all ${color.replace("text-", "bg-").replace("-400", "-500/50")}`}
                              style={{ height: `${Math.max(10, height)}%` }}
                            />
                          </div>
                        )
                      })}
                    </div>
                    <div className="flex gap-1 mt-1">
                      {vals.map((m, i) => (
                        <div key={i} className="flex-1 text-center text-xs text-muted-foreground">
                          {m.value % 1 === 0 ? m.value : m.value.toFixed(1)}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

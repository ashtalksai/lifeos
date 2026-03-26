"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Plus, Target, Loader2, ChevronRight } from "lucide-react"

interface Goal {
  id: string
  title: string
  description: string | null
  category: string
  timeframe: string
  status: string
  progress: number
  parentId: string | null
}

const TIMEFRAMES = ["30yr", "5yr", "1yr", "quarterly", "monthly", "weekly"]
const CATEGORIES = ["career", "health", "money", "personal", "relationship"]

const TIMEFRAME_LABELS: Record<string, string> = {
  "30yr": "30 Year Vision",
  "5yr": "5 Year Goals",
  "1yr": "This Year",
  "quarterly": "This Quarter",
  "monthly": "This Month",
  "weekly": "This Week",
}

const CATEGORY_COLORS: Record<string, string> = {
  career: "bg-blue-500/20 text-blue-400",
  health: "bg-green-500/20 text-green-400",
  money: "bg-yellow-500/20 text-yellow-400",
  personal: "bg-purple-500/20 text-purple-400",
  relationship: "bg-pink-500/20 text-pink-400",
}

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "personal",
    timeframe: "1yr",
    progress: 0,
  })

  useEffect(() => {
    fetch("/api/goals")
      .then((r) => r.json())
      .then((data) => {
        setGoals(data)
        setLoading(false)
      })
  }, [])

  async function createGoal() {
    setSaving(true)
    const res = await fetch("/api/goals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
    const newGoal = await res.json()
    setGoals((prev) => [...prev, newGoal])
    setDialogOpen(false)
    setForm({ title: "", description: "", category: "personal", timeframe: "1yr", progress: 0 })
    setSaving(false)
  }

  async function updateProgress(id: string, progress: number) {
    setGoals((prev) => prev.map((g) => g.id === id ? { ...g, progress } : g))
    await fetch(`/api/goals/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ progress }),
    })
  }

  const grouped = TIMEFRAMES.map((tf) => ({
    timeframe: tf,
    goals: goals.filter((g) => g.timeframe === tf && g.status === "active"),
  })).filter((g) => g.goals.length > 0)

  return (
    <div className="p-6 space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Goals</h1>
          <p className="text-sm text-muted-foreground">
            {goals.filter((g) => g.status === "active").length} active goals across all timeframes
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger>
            <Button size="sm" className="gap-1.5">
              <Plus className="w-4 h-4" />
              Add Goal
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border">
            <DialogHeader>
              <DialogTitle>New Goal</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-2">
              <div>
                <Label className="text-xs text-muted-foreground mb-1.5 block">Goal</Label>
                <Input
                  placeholder="What do you want to achieve?"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="bg-secondary/50"
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground mb-1.5 block">Description (optional)</Label>
                <Input
                  placeholder="Why does this matter?"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="bg-secondary/50"
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground mb-1.5 block">Timeframe</Label>
                <div className="flex gap-1.5 flex-wrap">
                  {TIMEFRAMES.map((tf) => (
                    <button
                      key={tf}
                      onClick={() => setForm({ ...form, timeframe: tf })}
                      className={`px-2.5 py-1 rounded-full text-xs transition-colors ${
                        form.timeframe === tf
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {tf}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground mb-1.5 block">Category</Label>
                <div className="flex gap-1.5 flex-wrap">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setForm({ ...form, category: cat })}
                      className={`px-2.5 py-1 rounded-full text-xs capitalize transition-colors ${
                        form.category === cat
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              <Button
                onClick={createGoal}
                disabled={!form.title || saving}
                className="w-full"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Create Goal"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      ) : goals.length === 0 ? (
        <Card className="bg-card border-border">
          <CardContent className="py-12 text-center">
            <Target className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground mb-3">No goals yet. Start with your 30-year vision.</p>
            <Button size="sm" onClick={() => setDialogOpen(true)}>Add your first goal</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {grouped.map(({ timeframe, goals: tfGoals }) => (
            <div key={timeframe}>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3">
                {TIMEFRAME_LABELS[timeframe]}
              </h3>
              <div className="space-y-2">
                {tfGoals.map((goal) => (
                  <Card key={goal.id} className="bg-card border-border">
                    <CardContent className="py-3 px-4">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex-1">
                          <p className="font-medium text-sm">{goal.title}</p>
                          {goal.description && (
                            <p className="text-xs text-muted-foreground mt-0.5">{goal.description}</p>
                          )}
                        </div>
                        <Badge className={`text-xs capitalize ${CATEGORY_COLORS[goal.category] || ""}`}>
                          {goal.category}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={goal.progress} className="flex-1 h-1.5" />
                        <span className="text-xs text-muted-foreground w-8 text-right">{goal.progress}%</span>
                      </div>
                      <div className="flex gap-1 mt-2">
                        {[0, 25, 50, 75, 100].map((pct) => (
                          <button
                            key={pct}
                            onClick={() => updateProgress(goal.id, pct)}
                            className={`flex-1 h-1.5 rounded-full transition-colors ${
                              goal.progress >= pct ? "bg-primary" : "bg-secondary"
                            }`}
                          />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Flame, Plus, CheckCircle, Circle, Loader2 } from "lucide-react"
import { Label } from "@/components/ui/label"

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
const COLORS = ["#6366f1", "#10b981", "#f59e0b", "#ef4444", "#3b82f6", "#8b5cf6"]

export default function HabitsPage() {
  const [habits, setHabits] = useState<Habit[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "health",
    icon: "💪",
    color: "#6366f1",
  })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetch("/api/habits")
      .then((r) => r.json())
      .then((data) => {
        setHabits(data)
        setLoading(false)
      })
  }, [])

  async function toggleHabit(habitId: string) {
    setHabits((prev) =>
      prev.map((h) =>
        h.id === habitId ? { ...h, completedToday: !h.completedToday } : h
      )
    )
    await fetch(`/api/habits/${habitId}/log`, { method: "POST", body: JSON.stringify({}) })
    // Refetch to get accurate streak
    const res = await fetch("/api/habits")
    const updated = await res.json()
    setHabits(updated)
  }

  async function createHabit() {
    setSaving(true)
    const res = await fetch("/api/habits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
    const newHabit = await res.json()
    setHabits((prev) => [...prev, { ...newHabit, completedToday: false }])
    setDialogOpen(false)
    setForm({ name: "", description: "", category: "health", icon: "💪", color: "#6366f1" })
    setSaving(false)
  }

  const grouped = CATEGORIES.map((cat) => ({
    category: cat,
    habits: habits.filter((h) => h.category === cat),
  })).filter((g) => g.habits.length > 0)

  const completedCount = habits.filter((h) => h.completedToday).length

  return (
    <div className="p-6 space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Habits</h1>
          <p className="text-sm text-muted-foreground">
            {completedCount}/{habits.length} done today
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger>
            <Button size="sm" className="gap-1.5">
              <Plus className="w-4 h-4" />
              Add Habit
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border">
            <DialogHeader>
              <DialogTitle>New Habit</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-2">
              <div>
                <Label className="text-xs text-muted-foreground mb-1.5 block">Name</Label>
                <Input
                  placeholder="e.g. Morning run"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="bg-secondary/50"
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground mb-1.5 block">Category</Label>
                <div className="flex gap-2 flex-wrap">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setForm({ ...form, category: cat })}
                      className={`px-3 py-1 rounded-full text-xs capitalize transition-colors ${
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
              <div>
                <Label className="text-xs text-muted-foreground mb-1.5 block">Icon</Label>
                <div className="flex gap-2 flex-wrap">
                  {ICONS.map((icon) => (
                    <button
                      key={icon}
                      onClick={() => setForm({ ...form, icon })}
                      className={`w-9 h-9 rounded-lg text-lg flex items-center justify-center transition-colors ${
                        form.icon === icon ? "bg-primary/30 ring-1 ring-primary" : "bg-secondary hover:bg-secondary/80"
                      }`}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground mb-1.5 block">Color</Label>
                <div className="flex gap-2">
                  {COLORS.map((color) => (
                    <button
                      key={color}
                      onClick={() => setForm({ ...form, color })}
                      className={`w-7 h-7 rounded-full transition-transform ${form.color === color ? "scale-125 ring-2 ring-foreground ring-offset-1 ring-offset-background" : ""}`}
                      style={{ background: color }}
                    />
                  ))}
                </div>
              </div>
              <Button
                onClick={createHabit}
                disabled={!form.name || saving}
                className="w-full"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Create Habit"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      ) : habits.length === 0 ? (
        <Card className="bg-card border-border">
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-3">No habits yet. Build your foundation.</p>
            <Button size="sm" onClick={() => setDialogOpen(true)}>Add your first habit</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-5">
          {grouped.map(({ category, habits: catHabits }) => (
            <div key={category}>
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                {category}
              </h3>
              <div className="space-y-2">
                {catHabits.map((habit) => (
                  <Card
                    key={habit.id}
                    className={`bg-card border-border cursor-pointer transition-all hover:border-primary/50 ${
                      habit.completedToday ? "opacity-75" : ""
                    }`}
                    onClick={() => toggleHabit(habit.id)}
                  >
                    <CardContent className="py-3 px-4 flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center text-lg flex-shrink-0"
                        style={{ background: habit.color + "30" }}
                      >
                        {habit.icon}
                      </div>
                      <div className="flex-1">
                        <p className={`font-medium text-sm ${habit.completedToday ? "line-through text-muted-foreground" : ""}`}>
                          {habit.name}
                        </p>
                        {habit.description && (
                          <p className="text-xs text-muted-foreground">{habit.description}</p>
                        )}
                      </div>
                      {habit.streak > 0 && (
                        <div className="flex items-center gap-1 text-xs text-orange-400">
                          <Flame className="w-3 h-3" />
                          <span>{habit.streak}</span>
                        </div>
                      )}
                      <div>
                        {habit.completedToday ? (
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        ) : (
                          <Circle className="w-5 h-5 text-muted-foreground/50" />
                        )}
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

"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Brain, CheckCircle, Target, BookOpen, Flame, TrendingUp, Sun, Moon, Zap } from "lucide-react"
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
  goals: Array<{ id: string; title: string; timeframe: string; category: string; progress: number; status: string }>
  journal: { content: string; mood: number | null } | null
  completedHabitsToday: number
  totalHabitsToday: number
}

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return "Good morning"
  if (hour < 17) return "Good afternoon"
  return "Good evening"
}

function getLatestMetric(metrics: DashboardData["metrics"], type: string) {
  return metrics.find((m) => m.type === type)?.value ?? null
}

const timeframeOrder = ["30yr", "5yr", "1yr", "quarterly", "monthly", "weekly"]

export function DashboardClient({ data, userName }: { data: DashboardData; userName: string }) {
  const {
    habits,
    metrics,
    goals,
    journal,
    completedHabitsToday,
    totalHabitsToday,
  } = data

  const completionRate = totalHabitsToday > 0 ? Math.round((completedHabitsToday / totalHabitsToday) * 100) : 0
  const sleepHours = getLatestMetric(metrics, "sleep_hours")
  const mood = getLatestMetric(metrics, "mood")
  const energy = getLatestMetric(metrics, "energy")
  const gymDone = getLatestMetric(metrics, "gym_done")

  const topStreak = habits.reduce((max, h) => Math.max(max, h.streak), 0)

  return (
    <div className="p-6 space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {getGreeting()}, {userName} 👋
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <Brain className="w-4 h-4 text-primary" />
          </div>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Card className="bg-card border-border">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-xs text-muted-foreground">Habits today</span>
            </div>
            <p className="text-2xl font-bold">{completedHabitsToday}<span className="text-sm text-muted-foreground">/{totalHabitsToday}</span></p>
            <Progress value={completionRate} className="h-1 mt-2" />
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center gap-2 mb-1">
              <Flame className="w-4 h-4 text-orange-400" />
              <span className="text-xs text-muted-foreground">Top streak</span>
            </div>
            <p className="text-2xl font-bold">{topStreak}<span className="text-sm text-muted-foreground"> days</span></p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center gap-2 mb-1">
              <Moon className="w-4 h-4 text-blue-400" />
              <span className="text-xs text-muted-foreground">Sleep last night</span>
            </div>
            <p className="text-2xl font-bold">
              {sleepHours !== null ? `${sleepHours}h` : "—"}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center gap-2 mb-1">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-xs text-muted-foreground">Energy today</span>
            </div>
            <p className="text-2xl font-bold">
              {energy !== null ? `${energy}/5` : "—"}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Habits */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              Today's Habits
            </h2>
            <Link href="/habits" className="text-xs text-primary hover:underline">View all →</Link>
          </div>
          <Card className="bg-card border-border">
            <CardContent className="pt-4">
              {habits.length === 0 ? (
                <div className="text-center py-4 text-muted-foreground text-sm">
                  <p>No habits yet.</p>
                  <Link href="/habits" className="text-primary hover:underline">Add your first habit →</Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {habits.slice(0, 6).map((habit) => (
                    <div key={habit.id} className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-base ${habit.logs.length > 0 ? "opacity-100" : "opacity-50"}`}
                        style={{ background: habit.color + "30" }}>
                        {habit.icon}
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm font-medium ${habit.logs.length > 0 ? "line-through text-muted-foreground" : ""}`}>
                          {habit.name}
                        </p>
                        <p className="text-xs text-muted-foreground capitalize">{habit.category}</p>
                      </div>
                      {habit.streak > 0 && (
                        <div className="flex items-center gap-1 text-xs text-orange-400">
                          <Flame className="w-3 h-3" />
                          {habit.streak}
                        </div>
                      )}
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        habit.logs.length > 0 ? "bg-green-500 border-green-500" : "border-muted-foreground"
                      }`}>
                        {habit.logs.length > 0 && <span className="text-xs text-white">✓</span>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Goals + Journal */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold flex items-center gap-2">
              <Target className="w-4 h-4 text-purple-400" />
              Active Goals
            </h2>
            <Link href="/goals" className="text-xs text-primary hover:underline">All →</Link>
          </div>
          <Card className="bg-card border-border">
            <CardContent className="pt-4">
              {goals.length === 0 ? (
                <div className="text-center py-4 text-muted-foreground text-sm">
                  <Link href="/goals" className="text-primary hover:underline">Add your first goal →</Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {goals.slice(0, 4).map((goal) => (
                    <div key={goal.id} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-medium truncate">{goal.title}</p>
                        <Badge variant="outline" className="text-xs px-1 py-0 ml-1 flex-shrink-0">
                          {goal.timeframe}
                        </Badge>
                      </div>
                      <Progress value={goal.progress} className="h-1" />
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Journal */}
          <div className="flex items-center justify-between">
            <h2 className="font-semibold flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-400" />
              Today's Journal
            </h2>
            <Link href="/journal" className="text-xs text-primary hover:underline">
              {journal ? "Edit →" : "Write →"}
            </Link>
          </div>
          <Card className="bg-card border-border">
            <CardContent className="pt-4">
              {journal ? (
                <div>
                  <p className="text-sm text-muted-foreground line-clamp-3">{journal.content}</p>
                  {journal.mood && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Mood: {"⭐".repeat(journal.mood)}
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No entry yet today.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

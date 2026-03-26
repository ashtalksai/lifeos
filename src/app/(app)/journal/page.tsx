"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, BookOpen, Save } from "lucide-react"

interface JournalEntry {
  id: string
  date: string | Date
  content: string
  mood: number | null
  energy: number | null
  gratitude: string | null
}

const MOOD_LABELS = ["", "😞 Rough", "😕 Meh", "😐 OK", "😊 Good", "🤩 Amazing"]

export default function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const today = new Date().toISOString().split("T")[0]
  const [content, setContent] = useState("")
  const [mood, setMood] = useState<number | null>(null)
  const [energy, setEnergy] = useState<number | null>(null)
  const [gratitude, setGratitude] = useState("")

  useEffect(() => {
    fetch("/api/journal?limit=30")
      .then((r) => r.json())
      .then((data) => {
        setEntries(data)
        const todayEntry = data.find((e: JournalEntry) => {
          const d = new Date(e.date)
          return d.toISOString().split("T")[0] === today
        })
        if (todayEntry) {
          setContent(todayEntry.content)
          setMood(todayEntry.mood)
          setEnergy(todayEntry.energy)
          setGratitude(todayEntry.gratitude ?? "")
        }
        setLoading(false)
      })
  }, [today])

  async function save() {
    setSaving(true)
    await fetch("/api/journal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date: today, content, mood, energy, gratitude }),
    })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
    // Refetch
    fetch("/api/journal?limit=30")
      .then((r) => r.json())
      .then(setEntries)
  }

  const pastEntries = entries.filter((e) => {
    const d = new Date(e.date)
    return d.toISOString().split("T")[0] !== today
  })

  return (
    <div className="p-6 space-y-6 max-w-3xl">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <BookOpen className="w-6 h-6 text-blue-400" />
        Journal
      </h1>

      {/* Today's entry */}
      <Card className="bg-card border-border">
        <CardContent className="pt-4 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-sm">
              Today — {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
            </h2>
          </div>

          <textarea
            className="w-full bg-secondary/30 rounded-lg p-3 text-sm resize-none min-h-32 outline-none focus:ring-1 focus:ring-primary/50 placeholder:text-muted-foreground"
            placeholder="How's it going? What happened today? What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground mb-2">Mood</p>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((v) => (
                  <button
                    key={v}
                    onClick={() => setMood(mood === v ? null : v)}
                    className={`flex-1 h-8 rounded text-xs transition-colors ${
                      mood === v ? "bg-primary text-primary-foreground" : "bg-secondary hover:bg-secondary/70"
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
              {mood && <p className="text-xs text-muted-foreground mt-1">{MOOD_LABELS[mood]}</p>}
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-2">Energy</p>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((v) => (
                  <button
                    key={v}
                    onClick={() => setEnergy(energy === v ? null : v)}
                    className={`flex-1 h-8 rounded text-xs transition-colors ${
                      energy === v ? "bg-yellow-500/80 text-black" : "bg-secondary hover:bg-secondary/70"
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs text-muted-foreground mb-2">Grateful for...</p>
            <input
              className="w-full bg-secondary/30 rounded-lg p-2.5 text-sm outline-none focus:ring-1 focus:ring-primary/50 placeholder:text-muted-foreground"
              placeholder="Three things you're grateful for today"
              value={gratitude}
              onChange={(e) => setGratitude(e.target.value)}
            />
          </div>

          <Button onClick={save} disabled={saving || !content} className="gap-2">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saved ? "Saved!" : "Save Entry"}
          </Button>
        </CardContent>
      </Card>

      {/* Past entries */}
      {pastEntries.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-medium text-muted-foreground">Past Entries</h2>
          {pastEntries.map((entry) => (
            <Card key={entry.id} className="bg-card border-border">
              <CardContent className="py-3 px-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-medium text-muted-foreground">
                    {new Date(entry.date).toLocaleDateString("en-US", {
                      weekday: "long", month: "long", day: "numeric"
                    })}
                  </p>
                  <div className="flex gap-2">
                    {entry.mood && <span className="text-xs text-muted-foreground">mood {entry.mood}/5</span>}
                    {entry.energy && <span className="text-xs text-muted-foreground">energy {entry.energy}/5</span>}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{entry.content}</p>
                {entry.gratitude && (
                  <p className="text-xs text-muted-foreground mt-1 italic">🙏 {entry.gratitude}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

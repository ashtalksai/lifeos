"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Target,
  Flame,
  Heart,
  DollarSign,
  Briefcase,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react"
import { useState } from "react"

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/goals", label: "Goals", icon: Target },
  { href: "/habits", label: "Habits", icon: Flame },
  { href: "/health", label: "Health", icon: Heart },
  { href: "/money", label: "Money", icon: DollarSign },
  { href: "/work", label: "Work", icon: Briefcase },
]

export function Sidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [mobileOpen, setMobileOpen] = useState(false)

  const NavContent = () => (
    <>
      {/* Logo */}
      <div className="px-5 py-4 border-b border-[var(--border)]">
        <Link href="/dashboard" className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
          <span
            className="text-lg font-bold tracking-[3px] text-[var(--accent)]"
            style={{ fontFamily: '"Space Grotesk", sans-serif' }}
          >
            MERIDIAN
          </span>
        </Link>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = pathname === item.href || pathname.startsWith(item.href + "/")
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-[var(--radius-sm)] text-sm transition-all duration-150",
                active
                  ? "bg-[var(--accent-muted)] text-[var(--accent)] font-medium border border-[var(--border-accent)]"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)]"
              )}
            >
              <Icon
                className={cn("w-4 h-4 flex-shrink-0", active ? "text-[var(--accent)]" : "text-[var(--text-muted)]")}
              />
              {item.label}
            </Link>
          )
        })}

        <div className="my-3 border-t border-[var(--border)]" />

        <Link
          href="/settings"
          onClick={() => setMobileOpen(false)}
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-[var(--radius-sm)] text-sm transition-all duration-150",
            pathname.startsWith("/settings")
              ? "bg-[var(--accent-muted)] text-[var(--accent)] font-medium border border-[var(--border-accent)]"
              : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)]"
          )}
        >
          <Settings className={cn("w-4 h-4 flex-shrink-0", pathname.startsWith("/settings") ? "text-[var(--accent)]" : "text-[var(--text-muted)]")} />
          Settings
        </Link>
      </nav>

      {/* Bottom — user + streak */}
      <div className="px-3 pb-4 border-t border-[var(--border)] pt-3 space-y-3">
        {session?.user && (
          <div className="px-3 py-2">
            <p className="text-xs text-[var(--text-primary)] font-medium truncate">
              {session.user.name || session.user.email}
            </p>
            <p className="text-xs text-[var(--text-muted)] truncate mt-0.5"
              style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
              {session.user.email}
            </p>
          </div>
        )}
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="flex items-center gap-2 px-3 py-2 w-full rounded-[var(--radius-sm)] text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] transition-all duration-150"
        >
          <LogOut className="w-4 h-4" />
          Sign out
        </button>
      </div>
    </>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-[220px] min-h-screen bg-[var(--surface)] border-r border-[var(--border)] flex-col flex-shrink-0">
        <NavContent />
      </aside>

      {/* Mobile: top bar + sheet */}
      <div className="md:hidden">
        <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 h-14 bg-[var(--background)] border-b border-[var(--border)]">
          <span className="text-base font-bold tracking-[3px] text-[var(--accent)]"
            style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
            MERIDIAN
          </span>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] p-1"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile sheet */}
        {mobileOpen && (
          <div className="fixed inset-0 z-40">
            <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
            <aside className="absolute left-0 top-0 bottom-0 w-64 bg-[var(--surface)] border-r border-[var(--border)] flex flex-col overflow-y-auto">
              <NavContent />
            </aside>
          </div>
        )}

        {/* Spacer for fixed top bar */}
        <div className="h-14" />
      </div>
    </>
  )
}

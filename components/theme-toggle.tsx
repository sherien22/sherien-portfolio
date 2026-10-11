'use client'

import { Moon, Sun } from 'lucide-react'
import { useSyncExternalStore } from 'react'
import { THEME_STORAGE_KEY } from '@/lib/theme'

function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
  return () => observer.disconnect()
}

const getSnapshot = () => document.documentElement.classList.contains('dark')
const getServerSnapshot = () => true

export function ThemeToggle() {
  const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  function toggleTheme() {
    const next = isDark ? 'light' : 'dark'
    document.documentElement.classList.toggle('dark', next === 'dark')
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next)
    } catch {
      // Storage can be unavailable (e.g. private mode); the theme still applies for this visit.
    }
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className="flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:text-foreground"
    >
      {isDark ? <Sun className="size-4" aria-hidden="true" /> : <Moon className="size-4" aria-hidden="true" />}
    </button>
  )
}

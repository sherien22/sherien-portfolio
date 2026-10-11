'use client'

import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ThemeToggle } from '@/components/theme-toggle'
import { navItems, profile } from '@/data/profile'
import { cn } from '@/lib/utils'

function normalize(path: string) {
  return path.length > 1 ? path.replace(/\/+$/, '') : path
}

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function SiteHeader() {
  const pathname = normalize(usePathname() ?? '/')
  const [menuOpen, setMenuOpen] = useState(false)
  const [lastPathname, setLastPathname] = useState(pathname)

  if (lastPathname !== pathname) {
    setLastPathname(pathname)
    setMenuOpen(false)
  }

  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-3 rounded-md" aria-label={`${profile.name} — home`}>
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary font-mono text-xs font-semibold text-primary-foreground">
            {profile.initials}
          </span>
          <span className="hidden text-sm font-medium tracking-tight sm:inline">{profile.name}</span>
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => {
              const active = isActive(pathname, item.href)
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'rounded-md px-3 py-2 text-sm transition-colors',
                      active ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:text-foreground',
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            className="flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X className="size-4" aria-hidden="true" /> : <Menu className="size-4" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <nav
        id="mobile-navigation"
        aria-label="Mobile"
        hidden={!menuOpen}
        className="border-t border-border bg-background lg:hidden"
      >
        <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4 sm:px-8">
          {navItems.map((item) => {
            const active = isActive(pathname, item.href)
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    'block rounded-md px-3 py-2.5 text-sm',
                    active ? 'bg-secondary font-medium text-foreground' : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}

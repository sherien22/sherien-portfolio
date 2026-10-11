import Link from 'next/link'
import { SocialLinks } from '@/components/social-links'
import { navItems, profile } from '@/data/profile'

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-[1.4fr_1fr_auto]">
        <div className="flex flex-col gap-3">
          <p className="font-medium tracking-tight">{profile.name}</p>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            {profile.title} · {profile.field} student at {profile.university}
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="w-fit text-sm text-primary underline-offset-4 hover:underline"
          >
            {profile.email}
          </a>
        </div>

        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-muted-foreground transition-colors hover:text-foreground">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <SocialLinks />
      </div>
      <div className="border-t border-border">
        <p className="mx-auto max-w-6xl px-5 py-6 text-xs text-muted-foreground sm:px-8">
          &copy; {year} {profile.name}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

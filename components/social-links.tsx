import { Mail } from 'lucide-react'
import { GitHubIcon, LinkedInIcon } from '@/components/brand-icons'
import { profile } from '@/data/profile'
import { cn } from '@/lib/utils'

export const socialLinks = [
  { label: 'GitHub', href: profile.github, icon: GitHubIcon, external: true },
  { label: 'LinkedIn', href: profile.linkedin, icon: LinkedInIcon, external: true },
  { label: 'Email', href: `mailto:${profile.email}`, icon: Mail, external: false },
] as const

export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={cn('flex items-center gap-2', className)}>
      {socialLinks.map(({ label, href, icon: Icon, external }) => (
        <li key={label}>
          <a
            href={href}
            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            aria-label={external ? `${label} (opens in a new tab)` : `Send an email to ${profile.name}`}
            className="flex size-10 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
          >
            <Icon className="size-4" />
          </a>
        </li>
      ))}
    </ul>
  )
}

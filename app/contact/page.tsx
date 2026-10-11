import { ArrowUpRight, Mail } from 'lucide-react'
import type { Metadata } from 'next'
import { GitHubIcon, LinkedInIcon } from '@/components/brand-icons'
import { ContactForm } from '@/components/contact-form'
import { CvButton } from '@/components/cv-button'
import { Container, PageHeader } from '@/components/page-shell'
import { profile } from '@/data/profile'

export const metadata: Metadata = {
  title: 'Contact',
  description: `Get in touch with ${profile.name} by email, LinkedIn, or GitHub.`,
}

const channels = [
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}`, icon: Mail, external: false },
  { label: 'LinkedIn', value: profile.linkedinHandle, href: profile.linkedin, icon: LinkedInIcon, external: true },
  { label: 'GitHub', value: profile.githubHandle, href: profile.github, icon: GitHubIcon, external: true },
]

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Get in touch"
        description="Interested in working together or discussing an opportunity? Reach out by email or connect with me on LinkedIn."
      />

      <Container className="grid gap-10 py-16 lg:grid-cols-[1fr_1.5fr] lg:gap-14">
        <aside className="flex flex-col gap-4">
          <h2 className="sr-only">Contact channels</h2>
          <ul className="flex flex-col gap-3">
            {channels.map(({ label, value, href, icon: Icon, external }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/40"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className="text-xs text-muted-foreground">{label}</span>
                    <span className="truncate font-medium">{value}</span>
                  </span>
                  <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" aria-hidden="true" />
                  {external ? <span className="sr-only">(opens in a new tab)</span> : null}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5">
            <p className="text-sm text-muted-foreground">Prefer a full overview of my background?</p>
            <CvButton className="w-fit" />
          </div>
        </aside>

        <section aria-labelledby="form-heading" className="rounded-2xl border border-border bg-card p-6 sm:p-8">
          <h2 id="form-heading" className="mb-6 text-xl font-semibold tracking-tight">
            Send a message
          </h2>
          <ContactForm />
        </section>
      </Container>
    </>
  )
}

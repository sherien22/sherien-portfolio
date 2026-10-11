import { ArrowRight, BookOpen, Briefcase, GraduationCap } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { CvButton } from '@/components/cv-button'
import { Container, PageHeader, SectionHeading } from '@/components/page-shell'
import { SmartImage } from '@/components/smart-image'
import { profile } from '@/data/profile'
import { linkButton } from '@/lib/link-styles'

export const metadata: Metadata = {
  title: 'About',
  description: `About ${profile.name}, a ${profile.field} student at ${profile.university} and aspiring ${profile.title}.`,
}

const focusAreas = [
  {
    icon: GraduationCap,
    title: 'Academic foundation',
    text: `${profile.field} at ${profile.university}, currently in my ${profile.studyYear.toLowerCase()} with a GPA of ${profile.gpa}.`,
  },
  {
    icon: BookOpen,
    title: 'Structured training',
    text: `${profile.training.track} track in the ${profile.training.program}.`,
  },
  {
    icon: Briefcase,
    title: 'Practical experience',
    text: `${profile.internship.role} at ${profile.internship.company}.`,
  },
]

const quickFacts = [
  { label: 'Name', value: profile.name },
  { label: 'Role', value: profile.title },
  { label: 'University', value: profile.university },
  { label: 'Study year', value: profile.studyYear },
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
]

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Computer Science student and aspiring Full-Stack Developer"
        description="Building practical, user-friendly, and maintainable web applications."
      />

      <Container className="grid gap-12 py-16 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <aside className="flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start">
          <div className="aspect-[4/5] overflow-hidden rounded-2xl border border-border bg-secondary">
            <SmartImage src={profile.photo.src} alt={profile.photo.alt} placeholderLabel="Profile photo" className="object-top" />
          </div>
          <dl className="flex flex-col divide-y divide-border rounded-2xl border border-border bg-card">
            {quickFacts.map((fact) => (
              <div key={fact.label} className="flex items-center justify-between gap-4 px-5 py-3 text-sm">
                <dt className="text-muted-foreground">{fact.label}</dt>
                <dd className="truncate text-right font-medium">
                  {fact.href ? (
                    <a href={fact.href} className="text-primary underline-offset-4 hover:underline">
                      {fact.value}
                    </a>
                  ) : (
                    fact.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </aside>

        <div className="flex flex-col gap-14">
          <section aria-labelledby="intro-heading">
            <h2 id="intro-heading" className="mb-6 text-2xl font-semibold tracking-tight">
              Introduction
            </h2>
            <div className="flex flex-col gap-5 text-pretty text-lg leading-relaxed text-muted-foreground">
              {profile.introduction.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
          </section>

          <section aria-labelledby="background-heading">
            <div id="background-heading">
              <SectionHeading title="Background at a glance" />
            </div>
            <ul className="grid gap-4 sm:grid-cols-3">
              {focusAreas.map(({ icon: Icon, title, text }) => (
                <li key={title} className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5">
                  <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <h3 className="font-medium">{title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{text}</p>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="next-heading" className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 sm:p-8">
            <h2 id="next-heading" className="text-xl font-semibold tracking-tight">
              Learn more
            </h2>
            <p className="text-muted-foreground">
              Review my skills and projects, or download my CV for a complete overview.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/skills" className={linkButton({ variant: 'primary' })}>
                View skills
                <ArrowRight aria-hidden="true" />
              </Link>
              <Link href="/projects" className={linkButton({ variant: 'outline' })}>
                View projects
              </Link>
              <CvButton variant="ghost" />
            </div>
          </section>
        </div>
      </Container>
    </>
  )
}

import { Briefcase, GraduationCap, Laptop, type LucideIcon } from 'lucide-react'
import type { Metadata } from 'next'
import { Container, PageHeader } from '@/components/page-shell'
import { educationEntries, type EducationKind } from '@/data/education'
import { profile } from '@/data/profile'

export const metadata: Metadata = {
  title: 'Education & Training',
  description: `Education, training, and internship of ${profile.name}: ${profile.field} at ${profile.university}, DEPI Full-Stack track, and a Full-Stack .NET internship at Petra.`,
}

const kindMeta: Record<EducationKind, { label: string; icon: LucideIcon }> = {
  education: { label: 'Education', icon: GraduationCap },
  training: { label: 'Training', icon: Laptop },
  internship: { label: 'Internship', icon: Briefcase },
}

export default function EducationPage() {
  return (
    <>
      <PageHeader
        eyebrow="Education"
        title="Education, training & internship"
        description="My academic background and the programs that shaped my development skills."
      />

      <Container className="py-16">
        <ol className="relative flex max-w-3xl flex-col gap-8 border-l border-border pl-8 sm:pl-10">
          {educationEntries.map((entry) => {
            const { label, icon: Icon } = kindMeta[entry.kind]
            const dates = [entry.startDate, entry.endDate].filter(Boolean).join(' — ')
            return (
              <li key={entry.id} className="relative">
                <span
                  className="absolute top-5 -left-[calc(2rem+1.125rem)] flex size-9 items-center justify-center rounded-full border border-border bg-background text-primary sm:-left-[calc(2.5rem+1.125rem)]"
                  aria-hidden="true"
                >
                  <Icon className="size-4" />
                </span>
                <article className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="rounded-md bg-primary/10 px-2 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-primary">
                      {label}
                    </span>
                    {dates ? <span className="font-mono text-xs text-muted-foreground">{dates}</span> : null}
                  </div>
                  <div className="flex flex-col gap-1">
                    <h2 className="text-xl font-semibold tracking-tight">{entry.title}</h2>
                    <p className="text-muted-foreground">{entry.organization}</p>
                  </div>
                  {entry.description ? <p className="leading-relaxed text-muted-foreground">{entry.description}</p> : null}
                  {entry.details.length > 0 ? (
                    <dl className="flex flex-wrap gap-x-8 gap-y-3 border-t border-border pt-4">
                      {entry.details.map((detail) => (
                        <div key={detail.label} className="flex flex-col gap-0.5">
                          <dt className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">{detail.label}</dt>
                          <dd className="font-medium">{detail.value}</dd>
                        </div>
                      ))}
                    </dl>
                  ) : null}
                </article>
              </li>
            )
          })}
        </ol>
      </Container>
    </>
  )
}

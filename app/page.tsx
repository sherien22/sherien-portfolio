import { ArrowRight, Mail } from 'lucide-react'
import Link from 'next/link'
import { CvButton } from '@/components/cv-button'
import { Container, Eyebrow, SectionHeading, Tag } from '@/components/page-shell'
import { ProjectCard } from '@/components/project-card'
import { SmartImage } from '@/components/smart-image'
import { SocialLinks } from '@/components/social-links'
import { profile } from '@/data/profile'
import { projects } from '@/data/projects'
import { skillCategories } from '@/data/skills'
import { linkButton } from '@/lib/link-styles'
import { revealDelay } from '@/lib/utils'

const highlights = [
  { label: 'University', value: profile.university },
  { label: 'Field', value: profile.field },
  { label: 'Study year', value: profile.studyYear },
  { label: 'GPA', value: profile.gpa },
  { label: 'Training', value: `${profile.training.shortName} · ${profile.training.track}` },
  { label: 'Internship', value: `${profile.internship.role} at ${profile.internship.company}` },
]

const stackPreview = skillCategories
  .filter((category) => ['languages', 'frontend', 'backend', 'databases'].includes(category.id))
  .flatMap((category) => category.skills)

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]" aria-hidden="true" />
        <Container className="relative grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
          <div className="flex flex-col gap-6">
            <div className="reveal flex w-fit items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1.5 text-xs text-muted-foreground">
              <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
              Open to software engineering opportunities
            </div>

            <div className="flex flex-col gap-3">
              <Eyebrow className="reveal" >{profile.title}</Eyebrow>
              <h1 className="reveal text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl" style={revealDelay(60)}>
                {profile.name}
              </h1>
            </div>

            <p className="reveal max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground" style={revealDelay(120)}>
              {profile.tagline}
            </p>

            <div className="reveal flex flex-wrap gap-3" style={revealDelay(180)}>
              <Link href="/projects" className={linkButton({ variant: 'primary' })}>
                View projects
                <ArrowRight aria-hidden="true" />
              </Link>
              <CvButton />
              <Link href="/contact" className={linkButton({ variant: 'ghost' })}>
                <Mail aria-hidden="true" />
                Contact me
              </Link>
            </div>

            <SocialLinks className="reveal pt-2" />
          </div>

          <div className="reveal mx-auto w-full max-w-sm lg:max-w-none" style={revealDelay(140)}>
            <div className="relative">
              <div className="absolute -inset-3 rounded-[1.75rem] border border-border" aria-hidden="true" />
              <div className="aspect-[4/5] overflow-hidden rounded-2xl border border-border bg-secondary">
                <SmartImage
                  src={profile.photo.src}
                  alt={profile.photo.alt}
                  placeholderLabel="Profile photo"
                  loading="eager"
                  className="object-top"
                />
              </div>
              <div className="absolute -bottom-5 left-5 right-5 flex items-center justify-between gap-3 rounded-xl border border-border bg-card/95 px-4 py-3 shadow-lg backdrop-blur">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{profile.university}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {profile.field} · {profile.studyYear}
                  </p>
                </div>
                <span className="shrink-0 rounded-md bg-primary/10 px-2 py-1 font-mono text-xs text-primary">
                  GPA {profile.gpa}
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="highlights-heading" className="border-b border-border">
        <Container className="py-14">
          <h2 id="highlights-heading" className="sr-only">
            Highlights
          </h2>
          <dl className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {highlights.map((item) => (
              <div key={item.label} className="flex flex-col gap-1 bg-card p-5">
                <dt className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">{item.label}</dt>
                <dd className="font-medium">{item.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section aria-labelledby="projects-heading">
        <Container className="py-20">
          <div id="projects-heading">
            <SectionHeading
              eyebrow="Selected work"
              title="Projects"
              description="Software projects built during my studies and training."
              action={
                <Link href="/projects" className={linkButton({ variant: 'outline' })}>
                  All projects
                  <ArrowRight aria-hidden="true" />
                </Link>
              }
            />
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} headingLevel="h3" />
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="stack-heading" className="border-y border-border bg-card/40">
        <Container className="grid gap-10 py-20 lg:grid-cols-[1fr_1.4fr] lg:items-center">
          <div className="flex flex-col gap-4">
            <Eyebrow>Technical background</Eyebrow>
            <h2 id="stack-heading" className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
              Languages, frameworks, and databases I work with
            </h2>
            <p className="text-muted-foreground">
              A foundation in object-oriented programming, database design, and web application development.
            </p>
            <Link href="/skills" className={`${linkButton({ variant: 'outline' })} w-fit`}>
              Explore skills
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <ul className="flex flex-wrap gap-2.5" aria-label="Technologies">
            {stackPreview.map((skill) => (
              <li key={skill}>
                <Tag>{skill}</Tag>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="cta-heading">
        <Container className="py-20">
          <div className="flex flex-col items-start gap-6 rounded-2xl border border-border bg-card p-8 sm:p-12 md:flex-row md:items-center md:justify-between">
            <div className="flex max-w-xl flex-col gap-2">
              <h2 id="cta-heading" className="text-balance text-2xl font-semibold tracking-tight">
                {"Let's build something useful together"}
              </h2>
              <p className="text-muted-foreground">
                I am looking for opportunities to contribute to real-world projects and grow as a Software Engineer.
              </p>
            </div>
            <Link href="/contact" className={linkButton({ variant: 'primary' })}>
              Get in touch
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>
    </>
  )
}

import { ArrowLeft, ArrowRight, CheckCircle2, Circle, ExternalLink } from 'lucide-react'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { GitHubIcon } from '@/components/brand-icons'
import { ImageGallery } from '@/components/image-gallery'
import { Container, Eyebrow, Tag } from '@/components/page-shell'
import { ImagePlaceholder } from '@/components/smart-image'
import { getProject, projects } from '@/data/projects'
import { linkButton } from '@/lib/link-styles'
import { publicFileExists } from '@/lib/public-file'
import { revealDelay } from '@/lib/utils'

export const dynamicParams = false

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: PageProps<'/projects/[slug]'>): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return {}
  return {
    title: `${project.title} — Case Study`,
    description: project.summary,
  }
}

function DetailSection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="flex flex-col gap-4">
      <h2 id={id} className="text-xl font-semibold tracking-tight">
        {title}
      </h2>
      {children}
    </section>
  )
}

export default async function ProjectDetailPage({ params }: PageProps<'/projects/[slug]'>) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  const images = project.images.filter((image) => publicFileExists(image.src))
  const planned = project.plannedFeatures ?? []
  const currentIndex = projects.findIndex((p) => p.slug === project.slug)
  const nextProject = projects[(currentIndex + 1) % projects.length]

  const facts = [
    { label: 'Category', value: project.category },
    { label: 'Technology', value: project.technology.join(' / ') },
    ...(project.database ? [{ label: 'Database', value: project.database }] : []),
    ...(project.role ? [{ label: 'My role', value: project.role }] : []),
  ]

  return (
    <article>
      <header className="border-b border-border">
        <Container className="flex flex-col gap-6 py-14 sm:py-20">
          <Link
            href="/projects"
            className="reveal flex w-fit items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            All projects
          </Link>
          <div className="flex flex-col gap-3">
            <Eyebrow className="reveal">Case study</Eyebrow>
            <h1 className="reveal text-balance text-4xl font-semibold tracking-tight sm:text-5xl" style={revealDelay(60)}>
              {project.title}
            </h1>
            <p className="reveal max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground" style={revealDelay(120)}>
              {project.summary}
            </p>
          </div>
          <ul className="reveal flex flex-wrap gap-2" aria-label="Technologies" style={revealDelay(160)}>
            {project.technology.map((tech) => (
              <li key={tech}>
                <Tag>{tech}</Tag>
              </li>
            ))}
          </ul>
        </Container>
      </header>

      <Container className="grid gap-12 py-14 lg:grid-cols-[1.7fr_1fr] lg:gap-16">
        <div className="flex flex-col gap-14">
          <DetailSection id="gallery-heading" title="Screenshots">
            {images.length > 0 ? (
              <ImageGallery images={images} label={`${project.title} screenshots`} />
            ) : (
              <div className="aspect-[16/10] overflow-hidden rounded-xl border border-dashed border-border">
                <ImagePlaceholder label="Screenshots will be added soon" />
              </div>
            )}
          </DetailSection>

          <DetailSection id="overview-heading" title="Overview">
            <div className="flex flex-col gap-4 leading-relaxed text-muted-foreground">
              <p>{project.summary}</p>
              {project.overview?.map((paragraph) => <p key={paragraph.slice(0, 24)}>{paragraph}</p>)}
            </div>
          </DetailSection>

          <DetailSection id="features-heading" title="Features">
            {project.implementedFeatures.length > 0 ? (
              <ul className="grid gap-3 sm:grid-cols-2">
                {project.implementedFeatures.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 rounded-lg border border-border bg-card p-4 text-sm">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="rounded-lg border border-dashed border-border p-5 text-sm text-muted-foreground">
                Project details will be added soon.
              </p>
            )}
          </DetailSection>

          {planned.length > 0 ? (
            <DetailSection id="planned-heading" title="Planned features">
              <p className="text-sm text-muted-foreground">These features are planned and not yet implemented.</p>
              <ul className="grid gap-3 sm:grid-cols-2">
                {planned.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 rounded-lg border border-dashed border-border p-4 text-sm text-muted-foreground">
                    <Circle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                    <span>
                      {feature} <span className="ml-1 font-mono text-[10px] uppercase tracking-wider">Planned</span>
                    </span>
                  </li>
                ))}
              </ul>
            </DetailSection>
          ) : null}
        </div>

        <aside className="flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start">
          <section aria-labelledby="facts-heading" className="rounded-2xl border border-border bg-card">
            <h2 id="facts-heading" className="border-b border-border px-5 py-4 text-sm font-semibold">
              Project details
            </h2>
            <dl className="flex flex-col divide-y divide-border">
              {facts.map((fact) => (
                <div key={fact.label} className="flex flex-col gap-1 px-5 py-3.5">
                  <dt className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">{fact.label}</dt>
                  <dd className="text-sm font-medium">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section aria-labelledby="links-heading" className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5">
            <h2 id="links-heading" className="text-sm font-semibold">
              Links
            </h2>
            {project.repositoryUrl || project.liveUrl ? (
              <div className="flex flex-col gap-2">
                {project.repositoryUrl ? (
                  <a href={project.repositoryUrl} target="_blank" rel="noopener noreferrer" className={linkButton({ variant: 'outline' })}>
                    <GitHubIcon />
                    View repository
                  </a>
                ) : null}
                {project.liveUrl ? (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={linkButton({ variant: 'primary' })}>
                    <ExternalLink aria-hidden="true" />
                    Live demo
                  </a>
                ) : null}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">The source code repository is not yet public.</p>
            )}
          </section>

          {nextProject && nextProject.slug !== project.slug ? (
            <Link
              href={`/projects/${nextProject.slug}`}
              className="group flex items-center justify-between gap-3 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/40"
            >
              <span className="flex flex-col gap-1">
                <span className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">Next project</span>
                <span className="font-medium">{nextProject.title}</span>
              </span>
              <ArrowRight className="size-4 text-primary transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          ) : null}
        </aside>
      </Container>
    </article>
  )
}

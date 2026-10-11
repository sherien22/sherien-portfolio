import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Tag } from '@/components/page-shell'
import { ImagePlaceholder, SmartImage } from '@/components/smart-image'
import type { Project } from '@/data/projects'
import { publicFileExists } from '@/lib/public-file'

export function ProjectCard({ project, headingLevel = 'h2' }: { project: Project; headingLevel?: 'h2' | 'h3' }) {
  const cover = project.images.find((image) => publicFileExists(image.src))
  const Heading = headingLevel
  const href = `/projects/${project.slug}`

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-primary/40">
      <div className="aspect-[16/10] overflow-hidden border-b border-border bg-secondary">
        {cover ? (
          <SmartImage
            src={cover.src}
            alt={cover.alt}
            placeholderLabel="Project screenshot coming soon"
            className="object-top transition-transform duration-500 group-hover:scale-[1.02]"
          />
        ) : (
          <ImagePlaceholder label="Project screenshot coming soon" />
        )}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex flex-col gap-2">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">{project.category}</p>
          <Heading className="text-xl font-semibold tracking-tight">
            <Link href={href} className="after:absolute after:inset-0 focus-visible:outline-none">
              {project.title}
            </Link>
          </Heading>
          <p className="leading-relaxed text-muted-foreground">{project.summary}</p>
        </div>

        <ul className="flex flex-wrap gap-2" aria-label="Technologies">
          {project.technology.map((tech) => (
            <li key={tech}>
              <Tag>{tech}</Tag>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-2">
          <span className="flex items-center gap-1.5 text-sm font-medium text-primary">
            View case study
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
          {!project.repositoryUrl ? (
            <span className="text-xs text-muted-foreground">Repository not yet public</span>
          ) : null}
        </div>
      </div>
    </article>
  )
}

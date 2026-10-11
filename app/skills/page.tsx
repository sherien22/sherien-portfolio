import { Braces, Cpu, Database, GitBranch, Layout, Server, type LucideIcon } from 'lucide-react'
import type { Metadata } from 'next'
import { Container, PageHeader } from '@/components/page-shell'
import { profile } from '@/data/profile'
import { skillCategories, type SkillCategoryId } from '@/data/skills'

export const metadata: Metadata = {
  title: 'Skills',
  description: `Technical skills of ${profile.name}: programming languages, frontend, backend, databases, CS fundamentals, and tools.`,
}

const categoryIcons: Record<SkillCategoryId, LucideIcon> = {
  languages: Braces,
  frontend: Layout,
  backend: Server,
  databases: Database,
  fundamentals: Cpu,
  tools: GitBranch,
}

export default function SkillsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Skills"
        title="Technical skills"
        description="Technologies and concepts from my academic studies, training, and software projects, organized by category."
      />

      <Container className="py-16">
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category) => {
            const Icon = categoryIcons[category.id]
            return (
              <li key={category.id}>
                <section
                  aria-labelledby={`skills-${category.id}`}
                  className="flex h-full flex-col gap-5 rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
                >
                  <div className="flex items-start gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <div className="flex flex-col gap-1">
                      <h2 id={`skills-${category.id}`} className="font-semibold leading-snug tracking-tight">
                        {category.title}
                      </h2>
                      <p className="text-sm text-muted-foreground">{category.description}</p>
                    </div>
                  </div>
                  <ul className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <li
                        key={skill}
                        className="rounded-md border border-border bg-secondary px-3 py-1.5 text-sm text-secondary-foreground"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </section>
              </li>
            )
          })}
        </ul>
      </Container>
    </>
  )
}

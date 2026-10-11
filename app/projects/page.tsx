import type { Metadata } from 'next'
import { Container, PageHeader } from '@/components/page-shell'
import { ProjectCard } from '@/components/project-card'
import { profile } from '@/data/profile'
import { projects } from '@/data/projects'

export const metadata: Metadata = {
  title: 'Projects',
  description: `Software projects by ${profile.name}, including Ars Anima (C# / .NET) and Nani Hospital System (PHP).`,
}

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title="Software projects"
        description="Web applications built during my studies and training. Select a project to view its case study."
      />
      <Container className="py-16">
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Container>
    </>
  )
}

export interface ProjectImage {
  /** Path relative to /public, e.g. "/images/projects/ars-anima/ars-anima-1.png" */
  src: string
  alt: string
  caption?: string
}

export interface Project {
  slug: string
  title: string
  category: string
  technology: string[]
  /** Leave undefined until the database technology is confirmed. */
  database?: string
  summary: string
  /** Optional longer overview paragraphs for the case-study page. */
  overview?: string[]
  /** Optional description of your personal role on the project. */
  role?: string
  /** Only list features that are actually implemented and verified. */
  implementedFeatures: string[]
  /** Features that are planned but not yet built. Displayed with a "Planned" label. */
  plannedFeatures?: string[]
  images: ProjectImage[]
  /** Add the real repository URL when available. Do not use the GitHub profile URL. */
  repositoryUrl?: string
  liveUrl?: string
}

export const projects: Project[] = [
  {
    slug: 'ars-anima',
    title: 'Ars Anima',
    category: 'Social platform for artists',
    technology: ['C#', '.NET'],
    summary:
      'Ars Anima is an artist-focused social platform designed to let artists showcase and share their creative work.',
    implementedFeatures: [],
    plannedFeatures: [],
    images: [
      {
        src: '/images/projects/ars-anima/ars-anima-1.png',
        alt: 'Ars Anima home page showing the Latest Artworks section with artwork cards',
      },
      {
        src: '/images/projects/ars-anima/ars-anima-2.png',
        alt: 'Additional screen from the Ars Anima platform',
      },
    ],
  },
  {
    slug: 'nani-hospital',
    title: 'Nani Hospital System',
    category: 'Hospital management system',
    technology: ['PHP'],
    database: undefined,
    summary: 'Nani Hospital System is a hospital management project developed using PHP.',
    implementedFeatures: [],
    plannedFeatures: [],
    images: [
      {
        src: '/images/projects/nani-hospital/nani-hospital-1.png',
        alt: 'Nani Hospital System page showing the Our Services section',
      },
      {
        src: '/images/projects/nani-hospital/nani-hospital-2.png',
        alt: 'Additional screen from the Nani Hospital System',
      },
    ],
  },
]

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug)
}

export type SkillCategoryId = 'languages' | 'frontend' | 'backend' | 'databases' | 'fundamentals' | 'tools'

export interface SkillCategory {
  id: SkillCategoryId
  title: string
  description: string
  skills: string[]
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'languages',
    title: 'Programming Languages',
    description: 'Languages used across coursework and projects.',
    skills: ['C++', 'C#', 'PHP'],
  },
  {
    id: 'frontend',
    title: 'Frontend Development',
    description: 'Building the structure, styling, and behavior of web interfaces.',
    skills: ['HTML5', 'CSS3', 'JavaScript'],
  },
  {
    id: 'backend',
    title: 'Backend Development and Frameworks',
    description: 'Server-side development and application frameworks.',
    skills: ['.NET', 'ASP.NET MVC', 'Laravel'],
  },
  {
    id: 'databases',
    title: 'Databases',
    description: 'Relational database systems.',
    skills: ['SQL Server', 'MySQL'],
  },
  {
    id: 'fundamentals',
    title: 'Computer Science Fundamentals',
    description: 'Core concepts from academic study and practice.',
    skills: [
      'Object-Oriented Programming',
      'Data Structures',
      'Algorithms',
      'Database Design',
      'SQL Queries & Joins',
      'MVC Architecture',
    ],
  },
  {
    id: 'tools',
    title: 'Tools',
    description: 'Everyday development tooling.',
    skills: ['Git', 'GitHub'],
  },
]

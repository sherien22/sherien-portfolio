export type EducationKind = 'education' | 'training' | 'internship'

export interface EducationEntry {
  id: string
  kind: EducationKind
  title: string
  organization: string
  details: { label: string; value: string }[]
  /** Free-form dates, e.g. "Sep 2022". Leave undefined until confirmed. */
  startDate?: string
  endDate?: string
  description?: string
}

export const educationEntries: EducationEntry[] = [
  {
    id: 'assiut-university',
    kind: 'education',
    title: 'Computer Science',
    organization: 'Assiut University',
    details: [
      { label: 'Current year', value: 'Fourth Year' },
      { label: 'GPA', value: '3.5' },
    ],
  },
  {
    id: 'depi',
    kind: 'training',
    title: 'Full-Stack Development Track',
    organization: 'Digital Egypt Pioneers Initiative (DEPI)',
    details: [{ label: 'Track', value: 'Full-Stack Development' }],
  },
  {
    id: 'petra-internship',
    kind: 'internship',
    title: 'Full-Stack .NET Internship',
    organization: 'Petra',
    details: [{ label: 'Focus', value: 'Full-Stack .NET' }],
  },
]

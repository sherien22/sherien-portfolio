export const profile = {
  name: 'Sherine Zarif Farhan',
  initials: 'SZF',
  title: 'Full-Stack Developer',
  email: 'sherienzarife@gmail.com',
  github: 'https://github.com/sherien22',
  githubHandle: 'sherien22',
  linkedin: 'https://www.linkedin.com/in/sherien-zarife-44a049320',
  linkedinHandle: 'sherien-zarife',
  university: 'Assiut University',
  field: 'Computer Science',
  studyYear: 'Fourth Year',
  gpa: '3.5',
  training: {
    program: 'Digital Egypt Pioneers Initiative (DEPI)',
    shortName: 'DEPI',
    track: 'Full-Stack Development',
  },
  internship: {
    role: 'Full-Stack .NET Internship',
    company: 'Petra',
  },
  photo: {
    src: '/images/profile.jpg',
    alt: 'Portrait of Sherine Zarif Farhan',
  },
  cv: {
    path: '/cv/Sherine_Zarif_CV.pdf',
    fileName: 'Sherine_Zarif_CV.pdf',
  },
  tagline:
    'Computer Science student at Assiut University and aspiring Full-Stack Developer building practical, user-friendly, and maintainable web applications.',
  introduction: [
    'I am a Computer Science student at Assiut University and an aspiring Full-Stack Developer with an interest in building practical, user-friendly, and maintainable web applications. My technical background includes C#, .NET, PHP, Laravel, JavaScript, and relational databases.',
    'Through my academic studies, training, and software projects, I have developed a foundation in object-oriented programming, database design, and web application development. I enjoy solving problems, learning new technologies, and turning ideas into functional software solutions.',
    'My goal is to grow as a Software Engineer, contribute to real-world projects, and continuously improve my technical skills while building reliable and maintainable applications.',
  ],
} as const

export const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/skills', label: 'Skills' },
  { href: '/projects', label: 'Projects' },
  { href: '/education', label: 'Education' },
  { href: '/certificates', label: 'Certificates' },
  { href: '/contact', label: 'Contact' },
] as const

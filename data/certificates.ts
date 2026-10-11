export interface Certificate {
  id: string
  title: string
  issuer: string
  /** Only set when the date is confirmed for this specific certificate. */
  date?: string
  /** Image path relative to /public, e.g. "/images/certificates/petra-internship.jpg" */
  image?: string
  /** Optional PDF path relative to /public, e.g. "/certificates/petra-internship.pdf" */
  file?: string
  /** Optional official verification URL from the issuer. */
  credentialUrl?: string
}

export const certificates: Certificate[] = [
  {
    id: 'petra-internship',
    title: 'Full-Stack .NET Internship',
    issuer: 'Petra',
    image: '/images/certificates/petra-internship.jpg',
  },
]

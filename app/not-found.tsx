import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Container, Eyebrow } from '@/components/page-shell'
import { linkButton } from '@/lib/link-styles'

export default function NotFound() {
  return (
    <Container className="flex flex-col items-start gap-5 py-28">
      <Eyebrow>404</Eyebrow>
      <h1 className="text-4xl font-semibold tracking-tight">Page not found</h1>
      <p className="max-w-md text-muted-foreground">The page you are looking for does not exist or has been moved.</p>
      <Link href="/" className={linkButton({ variant: 'primary' })}>
        <ArrowLeft aria-hidden="true" />
        Back to home
      </Link>
    </Container>
  )
}

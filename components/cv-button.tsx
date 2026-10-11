import { Download } from 'lucide-react'
import { profile } from '@/data/profile'
import { withBasePath } from '@/lib/base-path'
import { linkButton, type LinkButtonVariant } from '@/lib/link-styles'
import { publicFileExists } from '@/lib/public-file'
import { cn } from '@/lib/utils'

export function CvButton({ variant = 'outline', className }: { variant?: LinkButtonVariant; className?: string }) {
  if (!publicFileExists(profile.cv.path)) {
    return (
      <span
        aria-disabled="true"
        className={cn(linkButton({ variant }), 'cursor-not-allowed opacity-60', className)}
        title="The CV will be available soon"
      >
        <Download aria-hidden="true" />
        CV coming soon
      </span>
    )
  }

  return (
    <a
      href={withBasePath(profile.cv.path)}
      download={profile.cv.fileName}
      className={cn(linkButton({ variant }), className)}
    >
      <Download aria-hidden="true" />
      Download CV
    </a>
  )
}

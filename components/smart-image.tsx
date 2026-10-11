'use client'

import { ImageOff } from 'lucide-react'
import { useState } from 'react'
import { withBasePath } from '@/lib/base-path'
import { cn } from '@/lib/utils'

export function ImagePlaceholder({ label, className }: { label: string; className?: string }) {
  return (
    <div
      role="img"
      aria-label={`Placeholder: ${label}`}
      className={cn(
        'bg-grid flex h-full w-full flex-col items-center justify-center gap-2 bg-secondary/60 p-6 text-center text-muted-foreground',
        className,
      )}
    >
      <ImageOff className="size-5" aria-hidden="true" />
      <span className="font-mono text-[11px] uppercase tracking-[0.16em]">Placeholder</span>
      <span className="text-xs">{label}</span>
    </div>
  )
}

interface SmartImageProps {
  src: string
  alt: string
  placeholderLabel: string
  className?: string
  loading?: 'eager' | 'lazy'
}

/** Renders a local image and swaps to a labeled placeholder if the file fails to load. */
export function SmartImage({ src, alt, placeholderLabel, className, loading = 'lazy' }: SmartImageProps) {
  const [failed, setFailed] = useState(false)

  if (failed) return <ImagePlaceholder label={placeholderLabel} />

  return (
    // eslint-disable-next-line @next/next/no-img-element -- static export with base path; plain img keeps fallbacks simple
    <img
      src={withBasePath(src)}
      alt={alt}
      loading={loading}
      decoding="async"
      onError={() => setFailed(true)}
      className={cn('h-full w-full object-cover', className)}
    />
  )
}

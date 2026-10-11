'use client'

import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react'
import { useRef, useState, type KeyboardEvent, type MouseEvent } from 'react'
import { SmartImage } from '@/components/smart-image'
import { cn } from '@/lib/utils'

export interface GalleryImage {
  src: string
  alt: string
  caption?: string
}

interface ImageGalleryProps {
  images: GalleryImage[]
  /** Used for accessible labels, e.g. "Ars Anima screenshots". */
  label: string
  className?: string
  aspectClassName?: string
}

export function ImageGallery({ images, label, className, aspectClassName = 'aspect-[16/10]' }: ImageGalleryProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [index, setIndex] = useState(0)
  const hasMultiple = images.length > 1
  const current = images[index]

  function open(i: number) {
    setIndex(i)
    dialogRef.current?.showModal()
  }

  function close() {
    dialogRef.current?.close()
  }

  function step(delta: number) {
    setIndex((i) => (i + delta + images.length) % images.length)
  }

  function onDialogKeyDown(event: KeyboardEvent<HTMLDialogElement>) {
    if (!hasMultiple) return
    if (event.key === 'ArrowRight') step(1)
    if (event.key === 'ArrowLeft') step(-1)
  }

  function onDialogClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget) close()
  }

  if (images.length === 0) return null

  return (
    <>
      <ul className={cn('grid gap-4', hasMultiple && 'sm:grid-cols-2', className)} aria-label={label}>
        {images.map((image, i) => (
          <li key={image.src}>
            <figure className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => open(i)}
                className={cn(
                  'group relative block w-full overflow-hidden rounded-xl border border-border bg-secondary',
                  aspectClassName,
                )}
                aria-label={`View larger: ${image.alt}`}
              >
                <SmartImage
                  src={image.src}
                  alt={image.alt}
                  placeholderLabel="Image unavailable"
                  className="object-top transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <span className="absolute right-3 bottom-3 flex size-8 items-center justify-center rounded-md bg-background/85 text-foreground opacity-0 backdrop-blur transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                  <Expand className="size-4" aria-hidden="true" />
                </span>
              </button>
              {image.caption ? (
                <figcaption className="text-sm text-muted-foreground">{image.caption}</figcaption>
              ) : null}
            </figure>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label={`${label} — enlarged view`}
        onKeyDown={onDialogKeyDown}
        onClick={onDialogClick}
        className="m-auto max-h-[92vh] w-[min(1200px,94vw)] overflow-visible bg-transparent p-0 text-foreground backdrop:bg-black/80 backdrop:backdrop-blur-sm"
      >
        {current ? (
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between gap-4">
              <p className="truncate text-sm text-white/80" aria-live="polite">
                {hasMultiple ? `${index + 1} / ${images.length} · ` : ''}
                {current.caption ?? current.alt}
              </p>
              <button
                type="button"
                onClick={close}
                className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white hover:bg-white/20"
                aria-label="Close enlarged image"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </div>
            <div className="relative overflow-hidden rounded-xl bg-black">
              <div className="flex max-h-[80vh] items-center justify-center">
                <SmartImage
                  key={current.src}
                  src={current.src}
                  alt={current.alt}
                  placeholderLabel="Image unavailable"
                  loading="eager"
                  className="h-auto max-h-[80vh] w-auto max-w-full object-contain"
                />
              </div>
              {hasMultiple ? (
                <>
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    className="absolute top-1/2 left-3 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="size-5" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    className="absolute top-1/2 right-3 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
                    aria-label="Next image"
                  >
                    <ChevronRight className="size-5" aria-hidden="true" />
                  </button>
                </>
              ) : null}
            </div>
          </div>
        ) : null}
      </dialog>
    </>
  )
}

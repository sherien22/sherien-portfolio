import type { ReactNode } from 'react'
import { cn, revealDelay } from '@/lib/utils'

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('mx-auto w-full max-w-6xl px-5 sm:px-8', className)}>{children}</div>
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn('font-mono text-xs font-medium uppercase tracking-[0.18em] text-primary', className)}>
      {children}
    </p>
  )
}

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string
  title: string
  description?: string
  children?: ReactNode
}) {
  return (
    <section className="border-b border-border">
      <Container className="flex flex-col gap-4 py-16 sm:py-20">
        <Eyebrow className="reveal">{eyebrow}</Eyebrow>
        <h1
          className="reveal max-w-3xl text-balance text-4xl font-semibold tracking-tight sm:text-5xl"
          style={revealDelay(60)}
        >
          {title}
        </h1>
        {description ? (
          <p
            className="reveal max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
            style={revealDelay(120)}
          >
            {description}
          </p>
        ) : null}
        {children}
      </Container>
    </section>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string
  title: string
  description?: string
  action?: ReactNode
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex flex-col gap-2">
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
        {description ? <p className="max-w-2xl text-muted-foreground">{description}</p> : null}
      </div>
      {action}
    </div>
  )
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md border border-border bg-secondary px-2.5 py-1 font-mono text-xs text-secondary-foreground">
      {children}
    </span>
  )
}

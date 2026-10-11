'use client'

import { AlertCircle, CheckCircle2, Loader2, Send } from 'lucide-react'
import { useState, type FormEvent, type ReactNode } from 'react'
import { profile } from '@/data/profile'
import { cn } from '@/lib/utils'

/**
 * Public Formspree endpoint, e.g. https://formspree.io/f/abcdwxyz.
 * This is a public form URL, not a secret key — it is safe to expose to the browser.
 */
const FORM_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT

type Status = { type: 'idle' } | { type: 'submitting' } | { type: 'success' } | { type: 'error'; message: string }
type Fields = 'name' | 'email' | 'subject' | 'message'
type FieldErrors = Partial<Record<Fields, string>>

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(data: Record<Fields, string>): FieldErrors {
  const errors: FieldErrors = {}
  if (data.name.trim().length < 2) errors.name = 'Please enter your name.'
  if (!EMAIL_PATTERN.test(data.email.trim())) errors.email = 'Please enter a valid email address.'
  if (data.subject.trim().length < 2) errors.subject = 'Please enter a subject.'
  if (data.message.trim().length < 10) errors.message = 'Please write a message of at least 10 characters.'
  return errors
}

const inputClass =
  'w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive disabled:opacity-60'

function Field({
  id,
  label,
  error,
  children,
}: {
  id: Fields
  label: string
  error?: string
  children: ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-xs text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  )
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ type: 'idle' })
  const [errors, setErrors] = useState<FieldErrors>({})
  const isConfigured = Boolean(FORM_ENDPOINT)
  const submitting = status.type === 'submitting'

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)

    if (formData.get('_gotcha')) return

    const values = {
      name: String(formData.get('name') ?? ''),
      email: String(formData.get('email') ?? ''),
      subject: String(formData.get('subject') ?? ''),
      message: String(formData.get('message') ?? ''),
    }
    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      const firstInvalid = Object.keys(nextErrors)[0]
      form.querySelector<HTMLElement>(`#${firstInvalid}`)?.focus()
      return
    }

    if (!FORM_ENDPOINT) return

    setStatus({ type: 'submitting' })
    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      })
      if (!response.ok) throw new Error(`Request failed with status ${response.status}`)
      form.reset()
      setStatus({ type: 'success' })
    } catch {
      setStatus({
        type: 'error',
        message: `Your message could not be sent. Please try again or email me directly at ${profile.email}.`,
      })
    }
  }

  const describedBy = (field: Fields) => (errors[field] ? `${field}-error` : undefined)

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5" aria-describedby={!isConfigured ? 'form-not-configured' : undefined}>
      {!isConfigured ? (
        <div
          id="form-not-configured"
          className="flex items-start gap-3 rounded-lg border border-border bg-secondary/60 p-4 text-sm"
        >
          <AlertCircle className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
          <p className="text-muted-foreground">
            The contact form is not connected to a messaging service yet. Please email me directly at{' '}
            <a href={`mailto:${profile.email}`} className="font-medium text-primary underline-offset-4 hover:underline">
              {profile.email}
            </a>
            .
          </p>
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Name" error={errors.name}>
          <input id="name" name="name" type="text" autoComplete="name" required disabled={!isConfigured || submitting} aria-invalid={Boolean(errors.name)} aria-describedby={describedBy('name')} className={inputClass} placeholder="Your name" />
        </Field>
        <Field id="email" label="Email" error={errors.email}>
          <input id="email" name="email" type="email" autoComplete="email" required disabled={!isConfigured || submitting} aria-invalid={Boolean(errors.email)} aria-describedby={describedBy('email')} className={inputClass} placeholder="you@example.com" />
        </Field>
      </div>

      <Field id="subject" label="Subject" error={errors.subject}>
        <input id="subject" name="subject" type="text" required disabled={!isConfigured || submitting} aria-invalid={Boolean(errors.subject)} aria-describedby={describedBy('subject')} className={inputClass} placeholder="What is this about?" />
      </Field>

      <Field id="message" label="Message" error={errors.message}>
        <textarea id="message" name="message" rows={6} required disabled={!isConfigured || submitting} aria-invalid={Boolean(errors.message)} aria-describedby={describedBy('message')} className={cn(inputClass, 'resize-y')} placeholder="Write your message..." />
      </Field>

      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={!isConfigured || submitting}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : <Send className="size-4" aria-hidden="true" />}
          {submitting ? 'Sending…' : 'Send message'}
        </button>

        <div role="status" aria-live="polite" className="text-sm">
          {status.type === 'success' ? (
            <p className="flex items-center gap-2 text-primary">
              <CheckCircle2 className="size-4" aria-hidden="true" />
              Thank you — your message was delivered.
            </p>
          ) : null}
          {status.type === 'error' ? (
            <p className="flex items-start gap-2 text-destructive">
              <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              {status.message}
            </p>
          ) : null}
        </div>
      </div>
    </form>
  )
}

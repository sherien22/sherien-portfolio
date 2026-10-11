import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Inline style for staggering the `reveal` entrance animation. */
export function revealDelay(ms: number) {
  return { '--delay': `${ms}ms` } as import('react').CSSProperties
}

import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import { Geist, Geist_Mono } from 'next/font/google'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { themeInitScript } from '@/lib/theme'
import { profile } from '@/data/profile'
import './globals.css'

const geistSans = Geist({ subsets: ['latin'], variable: '--font-geist-sans' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: {
    default: `${profile.name} — ${profile.title}`,
    template: `%s | ${profile.name}`,
  },
  description: profile.tagline,
  authors: [{ name: profile.name, url: profile.github }],
  keywords: ['Sherine Zarif Farhan', 'Full-Stack Developer', 'C#', '.NET', 'PHP', 'Laravel', 'Portfolio', 'Assiut University'],
  openGraph: {
    type: 'website',
    title: `${profile.name} — ${profile.title}`,
    description: profile.tagline,
    siteName: profile.name,
  },
  twitter: {
    card: 'summary',
    title: `${profile.name} — ${profile.title}`,
    description: profile.tagline,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#121418' },
    { media: '(prefers-color-scheme: light)', color: '#fafbfc' },
  ],
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`dark ${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body className="flex min-h-dvh flex-col antialiased" suppressHydrationWarning>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
                <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  )
}

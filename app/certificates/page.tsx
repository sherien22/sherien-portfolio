import { ExternalLink, FileText } from 'lucide-react'
import type { Metadata } from 'next'
import { ImageGallery } from '@/components/image-gallery'
import { Container, PageHeader } from '@/components/page-shell'
import { ImagePlaceholder } from '@/components/smart-image'
import { certificates } from '@/data/certificates'
import { profile } from '@/data/profile'
import { withBasePath } from '@/lib/base-path'
import { linkButton } from '@/lib/link-styles'
import { publicFileExists } from '@/lib/public-file'

export const metadata: Metadata = {
  title: 'Certificates',
  description: `Certificates earned by ${profile.name}.`,
}

export default function CertificatesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Certificates"
        title="Certificates"
        description="Certificates from training and internship programs. Images and verification links are added as they become available."
      />

      <Container className="py-16">
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {certificates.map((certificate) => {
            const hasImage = publicFileExists(certificate.image)
            const hasFile = publicFileExists(certificate.file)
            return (
              <li key={certificate.id}>
                <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card">
                  {hasImage && certificate.image ? (
                    <div className="p-4 pb-0">
                      <ImageGallery
                        images={[{ src: certificate.image, alt: `${certificate.title} certificate from ${certificate.issuer}` }]}
                        label={`${certificate.title} certificate`}
                        aspectClassName="aspect-[4/3]"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[4/3] border-b border-border">
                      <ImagePlaceholder label="Certificate image will be added soon" />
                    </div>
                  )}

                  <div className="flex flex-1 flex-col gap-4 p-6">
                    <div className="flex flex-col gap-1">
                      <h2 className="text-lg font-semibold tracking-tight">{certificate.title}</h2>
                      <p className="text-sm text-muted-foreground">{certificate.issuer}</p>
                    </div>
                    <dl className="flex flex-col gap-1 text-sm">
                      <div className="flex gap-2">
                        <dt className="text-muted-foreground">Issued:</dt>
                        <dd>{certificate.date ?? 'Date to be confirmed'}</dd>
                      </div>
                    </dl>
                    {hasFile || certificate.credentialUrl ? (
                      <div className="mt-auto flex flex-wrap gap-2 pt-2">
                        {hasFile && certificate.file ? (
                          <a
                            href={withBasePath(certificate.file)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={linkButton({ variant: 'outline' })}
                          >
                            <FileText aria-hidden="true" />
                            View PDF
                          </a>
                        ) : null}
                        {certificate.credentialUrl ? (
                          <a
                            href={certificate.credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={linkButton({ variant: 'ghost' })}
                          >
                            <ExternalLink aria-hidden="true" />
                            Verify credential
                          </a>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </Container>
    </>
  )
}

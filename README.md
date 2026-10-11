# Sherine Zarif Farhan — Portfolio

A multi-page developer portfolio built with Next.js (App Router), TypeScript, and Tailwind CSS. It exports to static HTML, so it can be hosted on GitHub Pages or Vercel with no backend.

## Routes

| Route | Content |
| --- | --- |
| `/` | Hero, highlights, featured projects, technical background |
| `/about` | Professional introduction and background |
| `/skills` | Categorized skills |
| `/projects` | Project list |
| `/projects/ars-anima` | Ars Anima case study |
| `/projects/nani-hospital` | Nani Hospital System case study |
| `/education` | Education, training, and internship |
| `/certificates` | Certificates |
| `/contact` | Contact channels and contact form |

## Local development

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # static export written to ./out
```

## Editing content

All content lives in `data/`. Nothing about you is hardcoded in page components.

- `data/profile.ts` — name, title, email, social links, introduction, photo and CV paths.
- `data/skills.ts` — skill categories.
- `data/projects.ts` — projects. Per project you can set:
  - `implementedFeatures` — only verified, finished features. When empty, the page shows "Project details will be added soon."
  - `plannedFeatures` — shown in a separate section labeled "Planned". Hidden when empty.
  - `database` — leave `undefined` until confirmed (the row is hidden).
  - `overview`, `role`, `repositoryUrl`, `liveUrl` — optional; sections/buttons appear only when set.
- `data/education.ts` — add `startDate` / `endDate` / `description` when confirmed.
- `data/certificates.ts` — add certificates. `date`, `image`, `file` (PDF), and `credentialUrl` are optional.

## Adding assets

| Asset | Location |
| --- | --- |
| Profile photo | `public/images/profile.jpg` |
| CV | `public/cv/Sherine_Zarif_CV.pdf` |
| Ars Anima screenshots | `public/images/projects/ars-anima/` |
| Nani Hospital screenshots | `public/images/projects/nani-hospital/` |
| Certificate images | `public/images/certificates/` |
| Certificate PDFs | `public/certificates/` |

1. Copy the file into the folder above.
2. Reference its path (starting with `/`) in the matching `data/` file, e.g. `image: '/images/certificates/petra-internship.jpg'`.
3. Rebuild. Files are checked at build time: a missing image shows a labeled placeholder, and a missing CV turns the Download CV button into a disabled "CV coming soon" label — no broken images or 404 downloads.

## Contact form (Formspree)

A static site cannot send email on its own. The form posts to [Formspree](https://formspree.io):

1. Create a free Formspree form and copy its endpoint (e.g. `https://formspree.io/f/abcdwxyz`).
2. Locally: create `.env.local` with
   `NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/abcdwxyz`
3. GitHub Pages: repository **Settings → Secrets and variables → Actions → Variables** → add `FORMSPREE_ENDPOINT`.
4. Vercel: **Project Settings → Environment Variables** → add `NEXT_PUBLIC_FORMSPREE_ENDPOINT`.

The endpoint is a public form URL, not a secret. Until it is set, the form is disabled and visitors are asked to email directly. Success is only shown after Formspree confirms delivery.

## Deploying to GitHub Pages

The workflow in `.github/workflows/deploy.yml` builds and deploys on every push to `main`.

1. Push this project to a GitHub repository (branch `main`).
2. In the repository, open **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Push to `main` (or run the workflow manually from the **Actions** tab).
4. The site is published at:
   - `https://sherien22.github.io/<repo-name>/` for a normal repository — the base path is set automatically.
   - `https://sherien22.github.io/` if the repository is named `sherien22.github.io`.

To build a GitHub Pages version locally: `NEXT_PUBLIC_BASE_PATH=/<repo-name> pnpm build`.

## Deploying to Vercel (alternative)

Import the repository on Vercel or click **Publish** in v0. No base path is needed; leave `NEXT_PUBLIC_BASE_PATH` unset.

## Theme

Dark by default. The toggle in the header switches to light and the choice is stored in `localStorage`.

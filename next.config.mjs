// GitHub Pages serves project sites from /<repository-name>.
// Set NEXT_PUBLIC_BASE_PATH (e.g. "/portfolio") at build time; leave it empty
// for a user site (sherien22.github.io) or for Vercel.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath,
  images: {
    unoptimized: true,
  },
}

export default nextConfig

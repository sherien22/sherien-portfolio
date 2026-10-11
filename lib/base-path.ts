const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

/** Prefixes a /public asset path with the deployment base path (needed for GitHub Pages project sites). */
export function withBasePath(path: string) {
  if (/^(https?:|mailto:)/.test(path)) return path
  return `${basePath}${path.startsWith('/') ? path : `/${path}`}`
}

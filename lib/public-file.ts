import fs from 'node:fs'
import path from 'node:path'

/**
 * Server-only: checks at build/render time whether a file exists in /public,
 * so missing assets render an intentional placeholder instead of a broken link.
 */
export function publicFileExists(publicPath?: string): publicPath is string {
  if (!publicPath) return false
  try {
    return fs.statSync(path.join(process.cwd(), 'public', publicPath.replace(/^\//, ''))).isFile()
  } catch {
    return false
  }
}

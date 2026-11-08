/** Prefix an internal route or public asset with Vite's configured base path. */
export function sitePath(path: string): string {
  const basePath = import.meta.env.BASE_URL
  const relativePath = path.replace(/^\/+/, '')
  return relativePath ? `${basePath}${relativePath}` : basePath
}

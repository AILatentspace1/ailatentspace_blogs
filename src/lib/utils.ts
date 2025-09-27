// Utility function to handle basePath for GitHub Pages deployment
export function getAssetPath(path: string): string {
  const basePath = process.env.NODE_ENV === 'production' ? '/ailatentspace_blogs' : '';
  return `${basePath}${path}`;
}
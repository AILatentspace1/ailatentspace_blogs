/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: process.env.NODE_ENV === 'production' ? '/ailatentspace_blogs' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/ailatentspace_blogs/' : ''
}

module.exports = nextConfig
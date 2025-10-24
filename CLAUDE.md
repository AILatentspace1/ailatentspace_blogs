# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
AI research blog built with Next.js 15, TypeScript, and Tailwind CSS. Deployed as a static site to GitHub Pages at `/ailatentspace_blogs`.

## Tech Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS 3 with @tailwindcss/typography
- **Content**: MDX with next-mdx-remote and gray-matter
- **Deployment**: Static export to GitHub Pages
- **Icons**: @heroicons/react

## Development Commands

```bash
# Install dependencies
npm install

# Development server (prefer port 3000, fallback to 3001 if occupied)
npm run dev
# If port 3000 is occupied, stop the existing server first

# Production build (generates static export to ./out)
npm run build

# Start production server locally
npm start

# Lint
npm run lint

# Type check
npm run type-check
```

## Key Architecture

### Static Export Configuration
The project uses Next.js static export mode (`output: 'export'`) for GitHub Pages deployment:
- **basePath**: `/ailatentspace_blogs` (production only)
- **assetPrefix**: `/ailatentspace_blogs/` (production only)
- **images.unoptimized**: true (required for static export)
- **trailingSlash**: true
- Build output: `./out` directory

### Import Aliases
- `@/*` maps to `./src/*` (configured in tsconfig.json)
- Example: `import Navigation from '@/components/Navigation'`
- Use `getAssetPath()` from `@/lib/utils` for asset paths that need basePath handling

### Blog Post Architecture
**Important**: Blog posts require manual registration in two places:

1. **Create MDX file** in `src/content/posts/[slug].mdx` with frontmatter:
   ```mdx
   ---
   title: "Post Title"
   date: "2025-MM-DD"
   category: "Tools" | "Papers" | "Experiments" | "Tutorials"
   tags: ["tag1", "tag2"]
   description: "Post description"
   ---
   ```

2. **Create page directory** at `src/app/blog/[slug]/page.tsx`:
   - Import MDXRemote from 'next-mdx-remote/rsc'
   - Use gray-matter to parse frontmatter
   - Read MDX file from `src/content/posts/[slug].mdx`

3. **Register in blog index** at `src/app/blog/page.tsx`:
   - Add post metadata to the hardcoded `posts` array
   - Posts are NOT automatically discovered

**Note**: There is no dynamic route generation. Each blog post needs its own dedicated page directory.

### Content Structure
```
src/
├── app/
│   ├── layout.tsx              # Root layout with Navigation/Footer
│   ├── page.tsx                # Homepage
│   ├── blog/
│   │   ├── page.tsx            # Blog index (hardcoded posts array)
│   │   ├── [slug]/             # Individual post pages (one dir per post)
│   │   │   └── page.tsx
│   ├── about/page.tsx
│   ├── categories/page.tsx
│   ├── newsletter/page.tsx
│   └── globals.css
├── components/
│   ├── Navigation.tsx          # Site navigation
│   └── Footer.tsx              # Site footer
├── content/posts/              # MDX blog posts
│   └── *.mdx
└── lib/
    └── utils.ts                # Utilities (getAssetPath, etc.)
```

### Metadata & SEO
Global metadata configured in `src/app/layout.tsx`:
- Default title template: `%s | AI Latent Space`
- OpenGraph and Twitter card support
- Keywords, description, robots configuration

### Styling
- Global styles in `src/app/globals.css`
- Green theme (green-600, green-500 gradients)
- Custom animations: `animate-fade-in`
- Responsive design with Tailwind breakpoints (sm, md, lg)

## Deployment

### GitHub Actions Workflow
Location: `.github/workflows/deploy.yml`
- Triggers on push/PR to `main` branch
- Node.js 18
- Runs `npm ci` then `npm run build`
- Deploys `./out` directory to GitHub Pages

### Production URL
https://ailatentspace1.github.io/ailatentspace_blogs/

## Important Notes

1. **Asset Paths**: In production, all assets need the `/ailatentspace_blogs` prefix. Use `getAssetPath()` utility when needed.

2. **Adding Blog Posts**: Remember to update THREE locations:
   - MDX file in `src/content/posts/`
   - Page directory in `src/app/blog/[slug]/`
   - Posts array in `src/app/blog/page.tsx`

3. **Images**: Place in `public/` directory. They're unoptimized for static export.

4. **TypeScript**: Strict mode enabled. Use proper types, especially for frontmatter objects.

5. **Development Server**: Prefer port 3000. If occupied, stop the existing process before starting a new one.

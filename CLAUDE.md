# AI Latent Space Blog - Claude Instructions

## Project Overview
This is an AI research blog built with Next.js, TypeScript, and Tailwind CSS, designed for daily AI tech research posts with comment system and newsletter signup functionality.

## Tech Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Content**: MDX for blog posts
- **Deployment**: GitHub Pages (static export)
- **Comments**: Giscus (GitHub Discussions)
- **Newsletter**: ConvertKit/Mailchimp integration

## Development Commands
```bash
# Development
npm run dev

# Build
npm run build

# Lint
npm run lint

# Type check
npm run type-check
```

## Project Structure
```
src/
├── app/
│   ├── blog/[slug]/          # Individual blog posts
│   ├── about/                # About page
│   ├── newsletter/           # Newsletter signup
│   └── layout.tsx           # Root layout
├── components/
│   ├── BlogPost.tsx         # Blog post component
│   ├── Comments.tsx         # Giscus comments
│   ├── Newsletter.tsx       # Newsletter signup form
│   └── Navigation.tsx       # Site navigation
├── content/posts/           # MDX blog posts
└── lib/                     # Utilities and helpers
```

## Blog Post Format
Blog posts are written in MDX format with frontmatter:

```mdx
---
title: "AI Research Title"
date: "2024-01-01"
category: "Papers" | "Tools" | "Experiments" | "Tutorials"
tags: ["ai", "research", "ml"]
description: "Brief description"
---

# Post content here
```

## Categories
- **Papers**: AI research paper analyses
- **Tools**: AI tool reviews and tutorials
- **Experiments**: Personal AI experiments
- **Tutorials**: Technical tutorials and guides

## Features Required
- [x] Next.js setup with TypeScript
- [ ] MDX configuration for blog posts
- [ ] Blog post structure and metadata
- [ ] Site layout and navigation
- [ ] Giscus comment system
- [ ] Newsletter signup component
- [ ] GitHub Actions deployment
- [ ] RSS feed generation
- [ ] Search functionality
- [ ] SEO optimization

## Deployment
- Static export to GitHub Pages
- Automated deployment via GitHub Actions
- Custom domain support ready

## Content Guidelines
- Daily AI research posts
- Technical accuracy required
- Code examples with syntax highlighting
- Math equations supported via KaTeX
- Images and diagrams in `/public/images/`
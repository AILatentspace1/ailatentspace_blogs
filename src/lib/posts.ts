import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'src/content/posts')

export interface Post {
  slug: string
  title: string
  date: string
  category: string
  tags: string[]
  description: string
  author?: string
  series?: string
  part?: number
  readTime?: string
  excerpt?: string
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const matterResult = matter(fileContents)

      const post: Post = {
        slug,
        title: matterResult.data.title || slug,
        date: matterResult.data.date || new Date().toISOString().split('T')[0],
        category: matterResult.data.category || 'Uncategorized',
        tags: matterResult.data.tags || [],
        description: matterResult.data.description || '',
        author: matterResult.data.author,
        series: matterResult.data.series,
        part: matterResult.data.part,
        readTime: matterResult.data.readTime || `${Math.ceil(matterResult.content.split(' ').length / 200)} min read`,
        excerpt: matterResult.data.description || ''
      }

      return post
    })

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getPostBySlug(slug: string): { data: any; content: string } | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)

    return {
      data: matterResult.data,
      content: matterResult.content
    }
  } catch (error) {
    return null
  }
}

export function getPostsByTag(tag: string): Post[] {
  const allPosts = getAllPosts()
  return allPosts.filter(post => post.tags.includes(tag))
}

export function getPostsByCategory(category: string): Post[] {
  const allPosts = getAllPosts()
  return allPosts.filter(post => post.category === category)
}

export function getAllTags(): string[] {
  const allPosts = getAllPosts()
  const allTags = allPosts.flatMap(post => post.tags)
  return Array.from(new Set(allTags)).sort()
}

export function getAllCategories(): string[] {
  const allPosts = getAllPosts()
  const allCategories = allPosts.map(post => post.category)
  return Array.from(new Set(allCategories)).sort()
}
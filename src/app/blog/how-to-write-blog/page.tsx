import { MDXRemote } from 'next-mdx-remote/rsc'
import { readFileSync } from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

export default async function BlogPost() {
  const filePath = join(process.cwd(), 'src/content/posts/how-to-write-blog.mdx')
  const fileContent = readFileSync(filePath, 'utf8')
  const { data: frontmatter, content } = matter(fileContent)

  return (
    <article className="max-w-3xl mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {frontmatter.title}
        </h1>
        <div className="flex items-center gap-4 text-gray-600">
          <time>{frontmatter.date}</time>
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm">
            {frontmatter.category}
          </span>
        </div>
        <p className="text-lg text-gray-700 mt-4">
          {frontmatter.description}
        </p>
      </header>

      <div className="prose prose-lg max-w-none">
        <MDXRemote source={content} />
      </div>

      <footer className="mt-12 pt-8 border-t border-gray-200">
        <div className="flex flex-wrap gap-2">
          {frontmatter.tags?.map((tag: string) => (
            <span key={tag} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
              #{tag}
            </span>
          ))}
        </div>
      </footer>
    </article>
  )
}
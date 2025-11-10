import { notFound } from 'next/navigation'

import Link from 'next/link'
import { getPostBySlug, getAllPosts } from '@/lib/posts'
import CitationRenderer from '@/components/CitationRenderer'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.data.title,
    description: post.data.description,
  }
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          <nav className="mb-8">
            <Link
              href="/blog"
              className="text-green-600 hover:text-green-700 font-medium flex items-center gap-2"
            >
              ← Back to Blog
            </Link>
          </nav>

          <header>
            <div className="flex items-center gap-4 mb-6">
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                {post.data.category}
              </span>
              <time className="text-gray-500 text-sm">{post.data.date}</time>
              {post.data.readTime && (
                <span className="text-gray-500 text-sm">{post.data.readTime}</span>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {post.data.title}
            </h1>

            {post.data.description && (
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {post.data.description}
              </p>
            )}

            <div className="flex items-center gap-6 mb-8">
              {post.data.author && (
                <div className="flex items-center gap-2">
                  <span className="text-gray-700 font-medium">Author:</span>
                  <span className="text-gray-600">{post.data.author}</span>
                </div>
              )}

              {post.data.series && (
                <div className="flex items-center gap-2">
                  <span className="text-gray-700 font-medium">Series:</span>
                  <span className="text-green-600">{post.data.series}</span>
                  {post.data.part && (
                    <span className="text-gray-500">(Part {post.data.part})</span>
                  )}
                </div>
              )}
            </div>

            {post.data.tags && post.data.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {post.data.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </header>
        </div>
      </section>

      {/* Content */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4">
          <CitationRenderer content={post.content} />
        </div>
      </section>

      {/* Footer */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Enjoyed this article?
            </h2>
            <p className="text-gray-600 mb-8">
              Subscribe to get notified when we publish new AI research insights and tutorials.
            </p>
            <Link
              href="/newsletter"
              className="bg-gradient-to-r from-green-600 to-green-500 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 inline-block"
            >
              Subscribe to Newsletter
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <Link
                href="/blog"
                className="text-green-600 hover:text-green-700 font-medium"
              >
                ← Back to Blog
              </Link>

              <div className="text-gray-500 text-sm">
                Published on {post.data.date}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
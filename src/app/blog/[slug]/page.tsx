import { notFound } from 'next/navigation'

import Link from 'next/link'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import { getPostBySlug, getAllPosts } from '@/lib/posts'
import CitationRenderer from '@/components/CitationRenderer'
import { Card } from '@/components/apple'

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

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Papers: 'bg-blue-50 text-blue-700',
      Tools: 'bg-green-50 text-green-700',
      Experiments: 'bg-purple-50 text-purple-700',
      Tutorials: 'bg-orange-50 text-orange-700',
    }
    return colors[category] || 'bg-neutral-50 text-neutral-700'
  }

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <section className="py-20 md:py-32">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-12">
            <Link
              href="/blog"
              className="
                inline-flex items-center text-neutral-600 hover:text-neutral-900
                text-[15px] font-medium transition-colors duration-200
                hover:translate-x-1
              "
            >
              <ArrowLeftIcon className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </nav>

          {/* Article Header */}
          <header className="max-w-4xl mx-auto">
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <span className={`
                inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold
                ${getCategoryColor(post.data.category)}
              `}>
                {post.data.category}
              </span>
              <time className="text-neutral-500 text-[15px]">{post.data.date}</time>
              {post.data.readTime && (
                <span className="text-neutral-500 text-[15px]">{post.data.readTime}</span>
              )}
            </div>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-neutral-900 mb-8 leading-tight">
              {post.data.title}
            </h1>

            {post.data.description && (
              <p className="text-xl md:text-2xl text-neutral-600 mb-12 leading-relaxed">
                {post.data.description}
              </p>
            )}

            {/* Meta Information */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12 pb-8 border-b border-neutral-200">
              <div className="flex flex-wrap items-center gap-6">
                {post.data.author && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-neutral-200 flex items-center justify-center">
                      <span className="text-sm font-semibold text-neutral-600">
                        {post.data.author.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-neutral-900">{post.data.author}</div>
                      <div className="text-xs text-neutral-500">Author</div>
                    </div>
                  </div>
                )}

                {post.data.series && (
                  <div className="flex items-center gap-2">
                    <span className="text-neutral-700 font-medium text-sm">Series:</span>
                    <span className="text-primary-600 font-medium text-sm">{post.data.series}</span>
                    {post.data.part && (
                      <span className="text-neutral-500 text-sm">(Part {post.data.part})</span>
                    )}
                  </div>
                )}
              </div>

              {post.data.tags && post.data.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.data.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="
                        bg-neutral-100 text-neutral-700 px-3 py-1 rounded-lg text-sm font-medium
                        hover:bg-neutral-200 transition-colors duration-200
                      "
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </header>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <CitationRenderer content={post.content} />
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <Card variant="elevated" padding="lg" className="text-center bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 mb-6">
              Enjoyed this article?
            </h2>
            <p className="text-xl text-neutral-600 mb-12 leading-relaxed">
              Subscribe to get notified when we publish new AI research insights and tutorials.
              Join our community of AI enthusiasts and researchers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/newsletter"
                className="
                  bg-primary-400 hover:bg-primary-500
                  text-white font-semibold
                  text-lg tracking-tight
                  px-8 py-4 rounded-xl
                  shadow-apple-sm hover:shadow-apple-md
                  transition-all duration-200 ease-apple
                  hover:-translate-y-0.5
                  inline-flex items-center
                "
              >
                Subscribe to Newsletter
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/blog"
                className="
                  bg-white hover:bg-neutral-50
                  text-neutral-900 font-semibold
                  border-2 border-neutral-200 hover:border-neutral-300
                  text-lg tracking-tight
                  px-8 py-4 rounded-xl
                  shadow-apple-sm hover:shadow-apple-md
                  transition-all duration-200 ease-apple
                  hover:-translate-y-0.5
                  inline-flex items-center
                "
              >
                More Articles
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </Card>

          {/* Article Meta */}
          <div className="mt-16 pt-8 border-t border-neutral-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <Link
                href="/blog"
                className="
                  inline-flex items-center text-primary-600 hover:text-primary-700
                  font-medium text-[15px] transition-colors duration-200
                  hover:translate-x-1
                "
              >
                <ArrowLeftIcon className="mr-1 h-4 w-4" />
                Back to Blog
              </Link>

              <div className="text-neutral-500 text-[15px]">
                Published on {post.data.date}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
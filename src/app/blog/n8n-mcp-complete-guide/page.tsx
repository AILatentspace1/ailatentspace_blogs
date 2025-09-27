import { MDXRemote } from 'next-mdx-remote/rsc'
import { readFileSync } from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeftIcon, ClockIcon, CalendarIcon } from '@heroicons/react/24/outline'
import { getAssetPath } from '@/lib/utils'

export default async function BlogPost() {
  const filePath = join(process.cwd(), 'src/content/posts/n8n-mcp-complete-guide.mdx')
  const fileContent = readFileSync(filePath, 'utf8')
  const { data: frontmatter, content } = matter(fileContent)

  return (
    <div className="animate-fade-in">
      {/* Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <header className="bg-gradient-to-br from-green-50 via-white to-green-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Category Badge */}
            <div className="mb-6">
              <span className="bg-gradient-to-r from-green-600 to-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                {frontmatter.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {frontmatter.title}
            </h1>

            {/* Description */}
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
              {frontmatter.description}
            </p>

            {/* Meta Information */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-600">
              <div className="flex items-center">
                <CalendarIcon className="h-5 w-5 mr-2" />
                <time>{new Date(frontmatter.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</time>
              </div>
              <div className="flex items-center">
                <ClockIcon className="h-5 w-5 mr-2" />
                <span>12 min read</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <article className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg mx-auto">
            <MDXRemote source={content} />
          </div>
        </div>
      </article>

      {/* Article Footer */}
      <footer className="border-t border-gray-200 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tags */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
            <div className="flex flex-wrap gap-3">
              {frontmatter.tags?.map((tag: string) => (
                <Link
                  key={tag}
                  href={`/tags/${tag}`}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>

          {/* Author Section */}
          <div className="border-t border-gray-200 pt-8">
            <div className="flex items-center">
              <div className="w-20 h-20 mr-4">
                <Image
                  src={getAssetPath("/logo.png")}
                  alt="AI Latent Space"
                  width={80}
                  height={80}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-brand-green">AI Latent Space</h3>
                <p className="text-gray-600">
                  Exploring the frontiers of artificial intelligence through research and insights.
                </p>
                <div className="flex space-x-4 mt-2">
                  <Link href="https://twitter.com/ailatentspace" className="text-green-600 hover:text-green-700 text-sm">
                    Follow on Twitter
                  </Link>
                  <Link href="/newsletter" className="text-green-600 hover:text-green-700 text-sm">
                    Subscribe to Newsletter
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="border-t border-gray-200 pt-8 mt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <Link
                href="/"
                className="text-green-600 hover:text-green-700 font-medium flex items-center"
              >
                <ArrowLeftIcon className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
              <Link
                href="/newsletter"
                className="bg-gradient-to-r from-green-600 to-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
              >
                Subscribe for More
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Related Posts CTA */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Enjoyed this post?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Subscribe to get the latest AI research insights and tutorials delivered to your inbox.
          </p>
          <Link
            href="/newsletter"
            className="bg-gradient-to-r from-green-600 to-green-500 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 inline-block"
          >
            Subscribe to Newsletter
          </Link>
        </div>
      </section>
    </div>
  )
}
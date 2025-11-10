import Link from 'next/link'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { getAllPosts } from '@/lib/posts'
import { BlogPostCard, Card } from '@/components/apple'

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <section className="py-20 md:py-32">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 text-neutral-900">
              Blog Posts
            </h1>
            <p className="text-xl md:text-2xl text-neutral-600 mb-12 leading-relaxed max-w-3xl mx-auto">
              Explore our latest insights on AI research, tools, and technical tutorials.
              Discover cutting-edge developments in artificial intelligence and machine learning.
            </p>

            {/* Stats */}
            <div className="flex justify-center gap-12 mb-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-neutral-900">{posts.length}</div>
                <div className="text-[15px] text-neutral-600">Total Posts</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-500">4</div>
                <div className="text-[15px] text-neutral-600">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-neutral-900">{new Set(posts.map(p => p.category)).size}</div>
                <div className="text-[15px] text-neutral-600">Topics</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Posts */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {posts.map((post, index) => (
              <BlogPostCard
                key={post.slug}
                slug={post.slug}
                title={post.title}
                description={post.excerpt}
                date={post.date}
                category={post.category}
                readTime={post.readTime}
                featured={index === 0}
              />
            ))}
          </div>

          {/* Empty state */}
          {posts.length === 0 && (
            <Card variant="elevated" padding="lg" className="text-center">
              <div className="py-12">
                <h3 className="text-2xl font-bold text-neutral-900 mb-4">No posts yet</h3>
                <p className="text-neutral-600 mb-8">Check back soon for new content!</p>
                <Link
                  href="/"
                  className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200 hover:translate-x-1"
                >
                  Return to Home
                  <ArrowRightIcon className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </Card>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <Card variant="elevated" padding="lg" className="text-center bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 mb-6">
              Stay Updated
            </h2>
            <p className="text-xl text-neutral-600 mb-12 leading-relaxed">
              Subscribe to get notified when we publish new AI research insights and tutorials.
              Join our community of AI enthusiasts and researchers.
            </p>
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
          </Card>
        </div>
      </section>
    </div>
  )
}
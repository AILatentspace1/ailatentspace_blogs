import Link from 'next/link'

export default function BlogPage() {
  const posts = [
    {
      slug: 'n8n-mcp-complete-guide',
      title: 'Complete Guide to n8n-mcp: AI-Powered Workflow Automation with Claude Desktop',
      date: '2024-09-27',
      category: 'Tools',
      excerpt: 'Learn how to install n8n-mcp, configure it with Claude Desktop, create AI-powered workflows, and test them with Postman for seamless automation.',
      readTime: '12 min read',
      tags: ['n8n', 'mcp', 'automation', 'claude', 'workflows', 'ai']
    },
    {
      slug: 'how-to-write-blog',
      title: 'How to Write Blog',
      date: '2024-09-19',
      category: 'Tutorials',
      excerpt: 'A comprehensive guide on blog writing techniques and best practices for AI researchers and tech enthusiasts.',
      readTime: '5 min read',
      tags: ['blogging', 'writing', 'tutorial']
    }
  ]

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Blog Posts
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
              Explore our latest insights on AI research, tools, and technical tutorials.
            </p>
          </div>
        </div>
      </section>

      {/* Posts */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid gap-8">
            {posts.map((post) => (
              <article key={post.slug} className="border border-gray-200 rounded-lg p-8 bg-white hover:shadow-lg transition-all duration-300">
                <div className="flex flex-col">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                    <time className="text-gray-500 text-sm">{post.date}</time>
                    <span className="text-gray-500 text-sm">{post.readTime}</span>
                  </div>

                  <Link href={`/blog/${post.slug}`} className="block group">
                    <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors duration-200">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 text-lg leading-relaxed mb-4">
                      {post.excerpt}
                    </p>
                  </Link>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <span key={tag} className="text-gray-500 text-sm">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
                    >
                      Read more →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Empty state */}
          {posts.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No posts yet</h3>
              <p className="text-gray-600">Check back soon for new content!</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Stay Updated
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Subscribe to get notified when we publish new AI research insights and tutorials.
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
import Link from 'next/link'
import { ArrowRightIcon, CogIcon, BookOpenIcon, BeakerIcon } from '@heroicons/react/24/outline'

export default function Home() {
  const posts = [
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

  const categories = [
    {
      name: 'AI Papers',
      description: 'Latest research papers and academic insights',
      icon: BookOpenIcon,
      count: 12,
      color: 'from-green-500 to-green-600'
    },
    {
      name: 'Tools & Tech',
      description: 'AI tools, frameworks, and technology reviews',
      icon: BeakerIcon,
      count: 8,
      color: 'from-green-500 to-green-600'
    },
    {
      name: 'Experiments',
      description: 'Hands-on AI experiments and practical guides',
      icon: CogIcon,
      count: 15,
      color: 'from-green-500 to-green-600'
    }
  ]

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 via-white to-green-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Welcome to{' '}
              <span className="gradient-text">AI Latent Space</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              Exploring the frontiers of artificial intelligence through daily research,
              insights, and technical deep-dives into AI's most fascinating dimensions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/blog"
                className="bg-gradient-to-r from-green-600 to-green-500 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center"
              >
                Explore Posts
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/newsletter"
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:border-gray-400 transition-all duration-200"
              >
                Subscribe to Newsletter
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Explore Categories
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Dive deep into different aspects of AI research and development
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category) => (
              <div key={category.name} className="card card-hover p-6">
                <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center mb-4`}>
                  <category.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {category.name}
                </h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{category.count} posts</span>
                  <Link href={`/categories/${category.name.toLowerCase().replace(' & ', '-').replace(' ', '-')}`} className="text-green-600 hover:text-green-700 font-medium text-sm">
                    View all →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Posts Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Latest Posts
              </h2>
              <p className="text-lg text-gray-600">
                Fresh insights from the world of AI research
              </p>
            </div>
            <Link
              href="/blog"
              className="hidden sm:flex items-center text-green-600 hover:text-green-700 font-medium"
            >
              View all posts
              <ArrowRightIcon className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-8">
            {posts.map((post) => (
              <article key={post.slug} className="card p-8">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        {post.category}
                      </span>
                      <time className="text-gray-500 text-sm">{post.date}</time>
                      <span className="text-gray-500 text-sm">{post.readTime}</span>
                    </div>

                    <Link href={`/blog/${post.slug}`} className="block group">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors duration-200">
                        {post.title}
                      </h3>
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
                  </div>

                  <div className="lg:ml-8 mt-4 lg:mt-0">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
                    >
                      Read more
                      <ArrowRightIcon className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-8 sm:hidden">
            <Link
              href="/blog"
              className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
            >
              View all posts
              <ArrowRightIcon className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-green-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Stay Updated with AI Research
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Get the latest AI insights, research summaries, and technical tutorials
            delivered to your inbox every week.
          </p>
          <Link
            href="/newsletter"
            className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200 inline-block"
          >
            Subscribe to Newsletter
          </Link>
        </div>
      </section>
    </div>
  )
}
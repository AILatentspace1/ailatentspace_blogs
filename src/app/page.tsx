import Link from 'next/link'
import { ArrowRightIcon, CogIcon, BookOpenIcon, BeakerIcon } from '@heroicons/react/24/outline'
import { Button, Card, BlogPostCard } from '@/components/apple'

export default function Home() {
  const posts = [
    {
      slug: 'how-to-write-blog',
      title: 'How to Write Blog',
      date: '2024-09-19',
      category: 'Tutorials',
      description: 'A comprehensive guide on blog writing techniques and best practices for AI researchers and tech enthusiasts.',
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
      color: 'bg-blue-50 text-blue-700'
    },
    {
      name: 'Tools & Tech',
      description: 'AI tools, frameworks, and technology reviews',
      icon: BeakerIcon,
      count: 8,
      color: 'bg-green-50 text-green-700'
    },
    {
      name: 'Experiments',
      description: 'Hands-on AI experiments and practical guides',
      icon: CogIcon,
      count: 15,
      color: 'bg-purple-50 text-purple-700'
    }
  ]

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="py-20 md:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-50 via-white to-white -z-10" />
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 text-neutral-900">
              Welcome to{' '}
              <span className="text-primary-500">
                AI Latent Space
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-neutral-600 mb-12 leading-relaxed max-w-3xl mx-auto">
              Exploring the frontiers of artificial intelligence through daily research,
              insights, and technical deep-dives into AI's most fascinating dimensions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/blog"
                className="
                  bg-primary-400 hover:bg-primary-500
                  text-white font-semibold
                  text-lg tracking-tight
                  px-8 py-4 rounded-xl
                  shadow-apple-sm hover:shadow-apple-md
                  transition-all duration-200 ease-apple
                  hover:-translate-y-0.5 active:translate-y-0
                  inline-flex items-center justify-center
                "
              >
                Explore Posts
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/newsletter"
                className="
                  bg-white hover:bg-neutral-50
                  text-neutral-900 font-semibold
                  border-2 border-neutral-200 hover:border-neutral-300
                  text-lg tracking-tight
                  px-8 py-4 rounded-xl
                  shadow-apple-sm hover:shadow-apple-md
                  transition-all duration-200 ease-apple
                  hover:-translate-y-0.5 active:translate-y-0
                  inline-flex items-center justify-center
                "
              >
                Subscribe to Newsletter
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 mb-6">
              Explore Categories
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Dive deep into different aspects of AI research and development
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Card key={category.name} hover={true} className="text-center group">
                <div className={`w-16 h-16 ${category.color} rounded-2xl flex items-center justify-center mb-6 mx-auto transition-transform duration-300 group-hover:scale-110`}>
                  <category.icon className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                  {category.name}
                </h3>
                <p className="text-neutral-600 text-base mb-6 leading-relaxed">{category.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[15px] text-neutral-500">{category.count} posts</span>
                  <Link
                    href={`/categories/${category.name.toLowerCase().replace(' & ', '-').replace(' ', '-')}`}
                    className="text-primary-600 hover:text-primary-700 font-medium text-[15px] transition-colors duration-200 hover:translate-x-1 inline-flex items-center"
                  >
                    View all
                    <ArrowRightIcon className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Posts Section */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center mb-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 mb-4">
                Latest Posts
              </h2>
              <p className="text-xl text-neutral-600">
                Fresh insights from the world of AI research
              </p>
            </div>
            <Link
              href="/blog"
              className="hidden sm:flex items-center text-primary-600 hover:text-primary-700 font-medium text-[15px] transition-colors duration-200 hover:translate-x-1"
            >
              View all posts
              <ArrowRightIcon className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {posts.map((post) => (
              <BlogPostCard
                key={post.slug}
                slug={post.slug}
                title={post.title}
                description={post.description}
                date={post.date}
                category={post.category}
                readTime={post.readTime}
              />
            ))}
          </div>

          <div className="text-center mt-12 sm:hidden">
            <Link
              href="/blog"
              className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200 hover:translate-x-1"
            >
              View all posts
              <ArrowRightIcon className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <Card variant="elevated" padding="lg" className="text-center bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 mb-6">
              Stay Updated with AI Research
            </h2>
            <p className="text-xl text-neutral-600 mb-12 leading-relaxed">
              Get the latest AI insights, research summaries, and technical tutorials
              delivered to your inbox every week.
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
                hover:-translate-y-0.5 active:translate-y-0
                inline-flex items-center justify-center
              "
            >
              Subscribe to Newsletter
            </Link>
          </Card>
        </div>
      </section>
    </div>
  )
}
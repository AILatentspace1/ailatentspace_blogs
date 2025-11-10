import Link from 'next/link'
import { ArrowRightIcon, SparklesIcon, BookOpenIcon, BeakerIcon } from '@heroicons/react/24/outline'

/**
 * Apple风格首页
 *
 * 设计特点：
 * 1. 大量留白，呼吸空间充足
 * 2. 精致的排版层次
 * 3. 柔和的配色和渐变
 * 4. 流畅的动画效果
 */

export default function HomePageApple() {
  const posts = [
    {
      slug: 'neural-networks-fundamentals',
      title: '神经网络基础原理与核心概念深度解析',
      date: '2025-01-09',
      category: 'Papers',
      excerpt: '深入探讨神经网络的基础原理，从感知机到深度学习，全面理解现代AI的核心技术。',
      readTime: '15 min read',
      tags: ['神经网络', '深度学习', 'AI基础']
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

  const categories = [
    {
      name: 'AI Papers',
      description: 'Latest research papers and academic insights',
      icon: BookOpenIcon,
      count: 12,
      color: 'from-primary-400 to-primary-500'
    },
    {
      name: 'Tools & Tech',
      description: 'AI tools, frameworks, and technology reviews',
      icon: BeakerIcon,
      count: 8,
      color: 'from-primary-500 to-primary-600'
    },
    {
      name: 'Experiments',
      description: 'Hands-on AI experiments and practical guides',
      icon: SparklesIcon,
      count: 15,
      color: 'from-primary-400 to-primary-600'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* 添加顶部间距，避免被fixed导航栏遮挡 */}
      <div className="h-14" />

      {/* Hero Section - Apple风格 */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* 柔和的背景渐变 */}
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-50 via-white to-white" />

        <div className="relative max-w-5xl mx-auto px-6 lg:px-8">
          <div className="text-center space-y-8">
            {/* 小标签 */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 border border-primary-100">
              <SparklesIcon className="w-4 h-4 text-primary-600" />
              <span className="text-sm font-medium text-primary-700">
                Daily AI Research & Insights
              </span>
            </div>

            {/* 主标题 */}
            <h1 className="
              text-5xl md:text-7xl font-bold tracking-tight
              bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-700
              bg-clip-text text-transparent
              leading-[1.1]
            ">
              Welcome to{' '}
              <span className="block mt-2 bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
                AI Latent Space
              </span>
            </h1>

            {/* 副标题 */}
            <p className="
              text-xl md:text-2xl text-neutral-600 font-normal
              max-w-3xl mx-auto leading-relaxed
            ">
              Exploring the frontiers of artificial intelligence through
              daily research, insights, and technical deep-dives into
              AI's most fascinating dimensions.
            </p>

            {/* CTA按钮组 */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                href="/blog"
                className="
                  group
                  bg-primary-400 hover:bg-primary-500
                  text-white font-semibold
                  px-8 py-3.5 rounded-xl
                  shadow-apple-md hover:shadow-apple-lg
                  transition-all duration-300 ease-apple
                  hover:-translate-y-1
                  active:translate-y-0
                  flex items-center justify-center gap-2
                "
              >
                Explore Posts
                <ArrowRightIcon className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/newsletter"
                className="
                  bg-white hover:bg-neutral-50
                  text-neutral-900 font-semibold
                  px-8 py-3.5 rounded-xl
                  border-2 border-neutral-200 hover:border-neutral-300
                  shadow-apple-sm hover:shadow-apple-md
                  transition-all duration-300 ease-apple
                  hover:-translate-y-0.5
                "
              >
                Subscribe to Newsletter
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4 tracking-tight">
              Explore Categories
            </h2>
            <p className="text-lg md:text-xl text-neutral-600">
              Dive deep into different aspects of AI research and development
            </p>
          </div>

          {/* Category Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={`/categories/${category.name.toLowerCase().replace(' & ', '-').replace(' ', '-')}`}
                className="
                  group
                  bg-white rounded-2xl p-8
                  border border-neutral-200
                  shadow-apple-sm hover:shadow-apple-lg
                  transition-all duration-300 ease-apple
                  hover:-translate-y-2
                  hover:border-neutral-300
                "
              >
                {/* Icon */}
                <div className={`
                  w-14 h-14 rounded-2xl
                  bg-gradient-to-br ${category.color}
                  flex items-center justify-center
                  mb-6
                  shadow-lg
                  transition-transform duration-300
                  group-hover:scale-110
                `}>
                  <category.icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-semibold text-neutral-900 mb-3 tracking-tight">
                  {category.name}
                </h3>
                <p className="text-neutral-600 leading-relaxed mb-6">
                  {category.description}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                  <span className="text-sm font-medium text-neutral-500">
                    {category.count} posts
                  </span>
                  <span className="
                    text-primary-600 font-medium text-sm
                    flex items-center gap-1
                    transition-transform group-hover:translate-x-1
                  ">
                    View all
                    <ArrowRightIcon className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Posts Section */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-3 tracking-tight">
                Latest Posts
              </h2>
              <p className="text-lg text-neutral-600">
                Fresh insights from the world of AI research
              </p>
            </div>
            <Link
              href="/blog"
              className="
                hidden sm:flex items-center gap-1
                text-primary-600 hover:text-primary-700
                font-medium
                transition-colors
              "
            >
              View all
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>

          {/* Post Cards */}
          <div className="space-y-6">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="
                  group
                  bg-white rounded-2xl p-8
                  border border-neutral-200
                  shadow-apple-sm hover:shadow-apple-lg
                  transition-all duration-300 ease-apple
                  hover:-translate-y-1
                  hover:border-neutral-300
                "
              >
                {/* Meta */}
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="
                    bg-primary-50 text-primary-700
                    px-3 py-1 rounded-lg
                    text-sm font-semibold
                  ">
                    {post.category}
                  </span>
                  <time className="text-sm text-neutral-500 font-medium">
                    {post.date}
                  </time>
                  <span className="text-sm text-neutral-500">•</span>
                  <span className="text-sm text-neutral-500 font-medium">
                    {post.readTime}
                  </span>
                </div>

                {/* Title & Excerpt */}
                <Link href={`/blog/${post.slug}`} className="block">
                  <h3 className="
                    text-2xl md:text-3xl font-bold text-neutral-900
                    mb-3 tracking-tight leading-tight
                    group-hover:text-primary-600
                    transition-colors duration-200
                  ">
                    {post.title}
                  </h3>
                  <p className="
                    text-lg text-neutral-600 leading-relaxed
                    mb-5
                  ">
                    {post.excerpt}
                  </p>
                </Link>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="
                        bg-neutral-100 text-neutral-700
                        px-3 py-1 rounded-lg
                        text-sm font-medium
                        hover:bg-neutral-200
                        transition-colors
                        cursor-pointer
                      "
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>

          {/* Mobile View All Link */}
          <div className="text-center mt-10 sm:hidden">
            <Link
              href="/blog"
              className="
                inline-flex items-center gap-1
                text-primary-600 hover:text-primary-700
                font-medium
              "
            >
              View all posts
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter CTA - Apple风格 */}
      <section className="py-24 bg-gradient-to-br from-primary-500 to-primary-600 relative overflow-hidden">
        {/* 装饰性元素 */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Stay Updated with AI Research
            </h2>
            <p className="text-xl md:text-2xl text-primary-50 max-w-2xl mx-auto leading-relaxed">
              Get the latest AI insights, research summaries, and technical
              tutorials delivered to your inbox every week.
            </p>
            <div className="pt-4">
              <Link
                href="/newsletter"
                className="
                  inline-block
                  bg-white text-primary-600
                  px-8 py-4 rounded-xl
                  font-semibold text-lg
                  shadow-apple-lg hover:shadow-apple-xl
                  transition-all duration-300 ease-apple
                  hover:-translate-y-1
                  active:translate-y-0
                "
              >
                Subscribe to Newsletter
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

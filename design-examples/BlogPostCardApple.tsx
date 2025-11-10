import Link from 'next/link'
import { ClockIcon, CalendarIcon, ArrowRightIcon } from '@heroicons/react/24/outline'

/**
 * Apple风格博客文章卡片
 *
 * 设计特点：
 * 1. 清晰的内容层次
 * 2. 精致的tag设计
 * 3. 柔和的hover效果
 * 4. 优雅的间距和排版
 */

interface BlogPostCardProps {
  slug: string
  title: string
  excerpt: string
  date: string
  category: string
  readTime?: string
  tags?: string[]
  author?: string
  featured?: boolean
}

export default function BlogPostCardApple({
  slug,
  title,
  excerpt,
  date,
  category,
  readTime,
  tags = [],
  author,
  featured = false
}: BlogPostCardProps) {
  return (
    <article
      className={`
        group
        bg-white rounded-2xl
        border border-neutral-200
        shadow-apple-sm hover:shadow-apple-lg
        transition-all duration-300 ease-apple
        hover:-translate-y-2
        hover:border-neutral-300
        ${featured ? 'md:col-span-2 lg:col-span-3' : ''}
      `}
    >
      <div className={`p-8 ${featured ? 'md:p-10' : ''}`}>
        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          {/* Category Badge */}
          <span
            className={`
              inline-flex items-center
              px-3 py-1 rounded-lg
              text-sm font-semibold
              ${getCategoryStyle(category)}
            `}
          >
            {category}
          </span>

          {/* Date */}
          <div className="flex items-center gap-1.5 text-sm text-neutral-500 font-medium">
            <CalendarIcon className="w-4 h-4" />
            <time dateTime={date}>{formatDate(date)}</time>
          </div>

          {/* Read Time */}
          {readTime && (
            <>
              <span className="text-neutral-300">•</span>
              <div className="flex items-center gap-1.5 text-sm text-neutral-500 font-medium">
                <ClockIcon className="w-4 h-4" />
                <span>{readTime}</span>
              </div>
            </>
          )}
        </div>

        {/* Title & Excerpt */}
        <Link href={`/blog/${slug}`} className="block">
          <h3
            className={`
              font-bold text-neutral-900 tracking-tight leading-tight
              mb-4
              group-hover:text-primary-600
              transition-colors duration-200
              ${featured ? 'text-3xl md:text-4xl' : 'text-2xl md:text-3xl'}
            `}
          >
            {title}
          </h3>

          <p
            className={`
              text-neutral-600 leading-relaxed
              mb-6
              ${featured ? 'text-lg md:text-xl' : 'text-base md:text-lg'}
            `}
          >
            {excerpt}
          </p>
        </Link>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.map((tag) => (
              <span
                key={tag}
                className="
                  bg-neutral-100 text-neutral-700
                  px-3 py-1 rounded-lg
                  text-sm font-medium
                  hover:bg-neutral-200
                  transition-colors duration-200
                  cursor-pointer
                "
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-6 border-t border-neutral-100">
          {/* Author */}
          {author && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                <span className="text-white text-sm font-semibold">
                  {author.charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="text-sm font-medium text-neutral-700">
                {author}
              </span>
            </div>
          )}

          {/* Read More Link */}
          <Link
            href={`/blog/${slug}`}
            className="
              inline-flex items-center gap-1.5
              text-primary-600 hover:text-primary-700
              font-semibold text-sm
              transition-all duration-200
              group-hover:gap-2
            "
          >
            Read more
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </article>
  )
}

// Helper Functions

function getCategoryStyle(category: string): string {
  const styles: Record<string, string> = {
    'Papers': 'bg-purple-50 text-purple-700',
    'Tools': 'bg-blue-50 text-blue-700',
    'Tutorials': 'bg-green-50 text-green-700',
    'Experiments': 'bg-orange-50 text-orange-700',
  }
  return styles[category] || 'bg-primary-50 text-primary-700'
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

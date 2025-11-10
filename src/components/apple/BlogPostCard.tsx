import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getAssetPath } from '@/lib/utils'
import Card from './Card'

/**
 * Apple风格博客文章卡片组件
 *
 * 设计特点：
 * 1. 清晰的信息层次
 * 2. 精致的图片处理
 * 3. 优雅的hover效果
 * 4. Apple风格的标签和时间显示
 */

export interface BlogPostCardProps {
  slug: string
  title: string
  description: string
  date: string
  category: string
  readTime: string
  image?: string
  author?: string
  featured?: boolean
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({
  slug,
  title,
  description,
  date,
  category,
  readTime,
  image,
  author = 'AI Latent Space',
  featured = false,
}) => {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const categoryColors: Record<string, string> = {
    Papers: 'bg-blue-50 text-blue-700 hover:bg-blue-100',
    Tools: 'bg-green-50 text-green-700 hover:bg-green-100',
    Experiments: 'bg-purple-50 text-purple-700 hover:bg-purple-100',
    Tutorials: 'bg-orange-50 text-orange-700 hover:bg-orange-100',
  }

  const getCategoryColor = (cat: string) =>
    categoryColors[cat] || 'bg-neutral-50 text-neutral-700 hover:bg-neutral-100'

  return (
    <Link href={`/blog/${slug}`} className="block group">
      <Card
        hover={true}
        padding="lg"
        className={`h-full ${featured ? 'ring-2 ring-primary-200' : ''}`}
      >
        {/* Featured Badge */}
        {featured && (
          <div className="mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary-100 text-primary-800">
              Featured
            </span>
          </div>
        )}

        {/* Article Image */}
        {image && (
          <div className="mb-6 relative overflow-hidden rounded-xl">
            <Image
              src={getAssetPath(image)}
              alt={title}
              width={640}
              height={360}
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        )}

        {/* Article Content */}
        <div className="space-y-4">
          {/* Category and Read Time */}
          <div className="flex items-center justify-between">
            <span className={`
              inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-200
              ${getCategoryColor(category)}
            `}>
              {category}
            </span>
            <span className="text-neutral-500 text-[15px]">
              {readTime}
            </span>
          </div>

          {/* Title */}
          <h3 className="
            text-xl md:text-2xl font-bold text-neutral-900
            leading-tight tracking-tight
            group-hover:text-neutral-700
            transition-colors duration-200
          ">
            {title}
          </h3>

          {/* Description */}
          <p className="text-neutral-600 text-base leading-relaxed line-clamp-3">
            {description}
          </p>

          {/* Meta Info */}
          <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center">
                <span className="text-xs font-semibold text-neutral-600">
                  {author.charAt(0)}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-neutral-900">{author}</p>
                <p className="text-xs text-neutral-500">{formattedDate}</p>
              </div>
            </div>

            <div className="text-primary-600">
              <svg
                className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  )
}

export default BlogPostCard
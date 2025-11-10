import React from 'react'
import { HTMLAttributes, forwardRef } from 'react'

/**
 * Apple风格Card组件
 *
 * 设计特点：
 * 1. 精致的阴影和圆角
 * 2. 优雅的hover效果
 * 3. 流畅的动画过渡
 * 4. 多种变体配置
 */

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean
  padding?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'elevated' | 'bordered'
  children: React.ReactNode
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      hover = true,
      padding = 'lg',
      variant = 'default',
      children,
      className = '',
      ...props
    },
    ref
  ) => {
    const baseStyles = `
      bg-white rounded-2xl
      transition-all duration-300 ease-apple
      ${className}
    `

    const variantStyles = {
      default: `
        border border-neutral-200
        shadow-apple-sm
        ${hover ? 'hover:shadow-apple-lg hover:-translate-y-2 hover:border-neutral-300' : ''}
      `,
      elevated: `
        shadow-apple-md
        ${hover ? 'hover:shadow-apple-xl hover:-translate-y-3' : ''}
      `,
      bordered: `
        border-2 border-neutral-200
        ${hover ? 'hover:border-neutral-300 hover:shadow-apple-md' : ''}
      `,
    }

    const paddingStyles = {
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    }

    return (
      <div
        ref={ref}
        className={`
          ${baseStyles}
          ${variantStyles[variant]}
          ${paddingStyles[padding]}
        `}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

export default Card
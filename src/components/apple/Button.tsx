import React from 'react'
import { ButtonHTMLAttributes, forwardRef } from 'react'

/**
 * Apple风格Button组件
 *
 * 设计特点：
 * 1. 精致的阴影和hover效果
 * 2. 流畅的动画过渡
 * 3. 多种变体和尺寸
 * 4. 完善的可访问性支持
 */

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  loading?: boolean
  children: React.ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      loading = false,
      children,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles = `
      inline-flex items-center justify-center
      font-semibold tracking-tight
      rounded-xl
      transition-all duration-200 ease-apple
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed
      ${fullWidth ? 'w-full' : ''}
      ${className}
    `

    const variantStyles = {
      primary: `
        bg-primary-400 hover:bg-primary-500
        text-white
        shadow-apple-sm hover:shadow-apple-md
        hover:-translate-y-0.5 active:translate-y-0
        focus-visible:ring-primary-400
      `,
      secondary: `
        bg-white hover:bg-neutral-50
        text-neutral-900
        border-2 border-neutral-200 hover:border-neutral-300
        shadow-apple-sm hover:shadow-apple-md
        hover:-translate-y-0.5 active:translate-y-0
        focus-visible:ring-neutral-400
      `,
      ghost: `
        bg-transparent hover:bg-neutral-100
        text-neutral-700 hover:text-neutral-900
        focus-visible:ring-neutral-400
      `,
      danger: `
        bg-red-500 hover:bg-red-600
        text-white
        shadow-apple-sm hover:shadow-apple-md
        hover:-translate-y-0.5 active:translate-y-0
        focus-visible:ring-red-400
      `,
    }

    const sizeStyles = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-[15px]',
      lg: 'px-8 py-4 text-base',
    }

    const loadingStyles = loading ? 'cursor-wait' : ''

    return (
      <button
        ref={ref}
        className={`
          ${baseStyles}
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${loadingStyles}
        `}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
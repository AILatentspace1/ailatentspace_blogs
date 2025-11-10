import React from 'react'
import { InputHTMLAttributes, forwardRef } from 'react'

/**
 * Apple风格Input组件
 *
 * 设计特点：
 * 1. 精致的边框和圆角
 * 2. 优雅的focus状态
 * 3. 流畅的动画过渡
 * 4. 完善的可访问性支持
 */

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'ghost'
  error?: boolean
  label?: string
  helperText?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = 'default',
      error = false,
      label,
      helperText,
      className = '',
      ...props
    },
    ref
  ) => {
    const baseStyles = `
      w-full px-4 py-3
      bg-white border-2 rounded-xl
      text-neutral-900 placeholder:text-neutral-400
      transition-all duration-200 ease-apple
      focus:outline-none
      ${className}
    `

    const variantStyles = {
      default: `
        border-neutral-200 hover:border-neutral-300
        focus:border-primary-400 focus:ring-2 focus:ring-primary-100
      `,
      ghost: `
        border-transparent bg-neutral-50
        focus:border-primary-400 focus:bg-white focus:ring-2 focus:ring-primary-100
      `,
    }

    const errorStyles = error
      ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
      : ''

    const labelStyles = `
      block text-sm font-medium text-neutral-700 mb-2
      ${error ? 'text-red-600' : ''}
    `

    const helperStyles = `
      text-xs mt-1
      ${error ? 'text-red-600' : 'text-neutral-500'}
    `

    return (
      <div className="w-full">
        {label && <label className={labelStyles}>{label}</label>}
        <input
          ref={ref}
          className={`
            ${baseStyles}
            ${variantStyles[variant]}
            ${errorStyles}
          `}
          {...props}
        />
        {helperText && <p className={helperStyles}>{helperText}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
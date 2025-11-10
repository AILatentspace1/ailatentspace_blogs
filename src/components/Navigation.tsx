'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { getAssetPath } from '@/lib/utils'

/**
 * Apple风格导航栏组件
 *
 * 设计特点：
 * 1. 毛玻璃效果（glassmorphism）
 * 2. 精致的hover状态
 * 3. 流畅的动画过渡
 * 4. 清晰的视觉层次
 * 5. 滚动状态监听
 */

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    setMounted(true)

    // 监听滚动，动态调整导航栏样式
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigationItems = [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog' },
    { name: 'Categories', href: '/categories' },
    { name: 'About', href: '/about' },
  ]

  if (!mounted) {
    return null
  }

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-300 ease-apple
        ${isScrolled
          ? 'glass-nav shadow-apple-sm'
          : 'bg-white/80 backdrop-blur-xl border-b border-transparent'
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 relative overflow-hidden rounded-full">
              <Image
                src={getAssetPath("/logo.png")}
                alt="AI Latent Space"
                width={36}
                height={36}
                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <span className="font-semibold text-[15px] text-neutral-900 tracking-tight">
              AI Latent Space
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="
                  text-neutral-600 hover:text-neutral-900
                  text-[15px] font-medium tracking-tight
                  px-3 py-1.5 rounded-lg
                  transition-all duration-200 ease-apple
                  hover:bg-neutral-100
                "
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/newsletter"
              className="
                bg-primary-400 hover:bg-primary-500
                text-white font-semibold
                text-[15px] tracking-tight
                px-4 py-1.5 rounded-lg
                shadow-sm hover:shadow-md
                transition-all duration-200 ease-apple
                hover:-translate-y-0.5
                active:translate-y-0
              "
            >
              Subscribe
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="
              md:hidden
              text-neutral-600 hover:text-neutral-900
              p-2 rounded-lg
              hover:bg-neutral-100
              transition-all duration-200
            "
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="
            md:hidden
            py-4 space-y-1
            border-t border-neutral-200
            animate-fade-in
          ">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="
                  text-neutral-600 hover:text-neutral-900
                  block px-4 py-2.5 rounded-lg
                  text-base font-medium
                  hover:bg-neutral-100
                  transition-all duration-200
                "
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/newsletter"
              className="
                bg-primary-400 text-white
                block px-4 py-2.5 rounded-lg
                text-base font-semibold
                text-center
                mt-3
              "
              onClick={() => setIsMenuOpen(false)}
            >
              Subscribe
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation
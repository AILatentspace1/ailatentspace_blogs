'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const Footer = () => {
  const [currentYear, setCurrentYear] = useState(2024)

  useEffect(() => {
    setCurrentYear(new Date().getFullYear())
  }, [])

  const footerLinks = {
    Blog: [
      { name: 'Latest Posts', href: '/blog' },
      { name: 'AI Papers', href: '/categories/papers' },
      { name: 'Tools', href: '/categories/tools' },
      { name: 'Tutorials', href: '/categories/tutorials' },
    ],
    About: [
      { name: 'About Us', href: '/about' },
      { name: 'Newsletter', href: '/newsletter' },
      { name: 'RSS Feed', href: '/feed.xml' },
      { name: 'Contact', href: '/contact' },
    ],
    Follow: [
      { name: 'Twitter', href: 'https://twitter.com/ailatentspace' },
      { name: 'GitHub', href: 'https://github.com/AILatentspace1' },
      { name: 'LinkedIn', href: '#' },
      { name: 'YouTube', href: '#' },
    ],
  }

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 mr-3">
                <Image
                  src="/logo.png"
                  alt="AI Latent Space"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-bold text-lg text-brand-green">
                AI Latent Space
              </span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Exploring the frontiers of artificial intelligence through daily research,
              insights, and technical deep-dives.
            </p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-gray-900 mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-600 hover:text-gray-900 text-sm transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">
            © {currentYear} AI Latent Space. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-gray-600 hover:text-gray-900 text-sm">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-600 hover:text-gray-900 text-sm">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
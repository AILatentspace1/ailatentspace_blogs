import './globals.css'
import type { Metadata } from 'next'
import { Inter, Fira_Code } from 'next/font/google'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-fira-code',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'AI Latent Space | Daily AI Research & Insights',
    template: '%s | AI Latent Space'
  },
  description: 'Exploring the frontiers of artificial intelligence through daily research, insights, and technical deep-dives. Join the journey into AI\'s latent dimensions.',
  keywords: ['AI', 'Machine Learning', 'Research', 'Technology', 'Blog'],
  authors: [{ name: 'AI Latent Space' }],
  creator: 'AI Latent Space',
  publisher: 'AI Latent Space',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ailatentspace1.github.io/ailatentspace_blogs/',
    title: 'AI Latent Space | Daily AI Research & Insights',
    description: 'Exploring the frontiers of artificial intelligence through daily research, insights, and technical deep-dives.',
    siteName: 'AI Latent Space',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Latent Space | Daily AI Research & Insights',
    description: 'Exploring the frontiers of artificial intelligence through daily research, insights, and technical deep-dives.',
    creator: '@ailatentspace',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${firaCode.variable}`}>
      <body className="bg-white text-gray-900 antialiased">
        <div className="min-h-screen flex flex-col">
          <Navigation />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
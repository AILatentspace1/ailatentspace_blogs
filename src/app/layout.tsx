import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Latent Space Blog',
  description: 'Daily AI research and tech insights',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-white">
          <header className="border-b border-gray-200">
            <div className="max-w-4xl mx-auto px-4 py-6">
              <h1 className="text-2xl font-bold text-gray-900">
                <a href="/">AI Latent Space</a>
              </h1>
              <p className="text-gray-600 mt-1">Daily AI Research & Tech Insights</p>
            </div>
          </header>
          <main className="max-w-4xl mx-auto px-4 py-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
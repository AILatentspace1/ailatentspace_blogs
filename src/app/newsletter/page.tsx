'use client'

import { useState } from 'react'
import { CheckIcon, EnvelopeIcon } from '@heroicons/react/24/outline'
import { Card, Input, Button } from '@/components/apple'

export default function NewsletterPage() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))

    setIsSubscribed(true)
    setIsLoading(false)
    setEmail('')
  }

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center">
              <EnvelopeIcon className="w-8 h-8 text-primary-600" />
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight gradient-text mb-8">
            Newsletter
          </h1>
          <p className="text-xl md:text-2xl text-neutral-600 mb-12 leading-relaxed max-w-3xl mx-auto">
            Stay updated with the latest AI research insights, technical tutorials, and industry trends.
            Join our community of AI enthusiasts and researchers.
          </p>

          {/* Stats */}
          <div className="flex justify-center gap-12 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-neutral-900">1K+</div>
              <div className="text-[15px] text-neutral-600">Subscribers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-500">Weekly</div>
              <div className="text-[15px] text-neutral-600">Updates</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-neutral-900">4.9</div>
              <div className="text-[15px] text-neutral-600">Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <Card variant="elevated" padding="lg" className="max-w-2xl mx-auto">
            {!isSubscribed ? (
              <>
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-neutral-900 mb-4">
                    Subscribe to Our Newsletter
                  </h3>
                  <p className="text-neutral-600 text-lg leading-relaxed">
                    Get weekly AI research insights, exclusive tutorials, and early access to new content.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <Input
                    type="email"
                    label="Email Address"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />

                  <div className="flex items-center gap-3 text-sm text-neutral-600">
                    <input
                      type="checkbox"
                      id="privacy"
                      className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                      required
                    />
                    <label htmlFor="privacy">
                      I agree to receive emails and accept the privacy policy
                    </label>
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    loading={isLoading}
                    disabled={!email || isLoading}
                  >
                    {isLoading ? 'Subscribing...' : 'Subscribe Now'}
                  </Button>

                  <p className="text-center text-[15px] text-neutral-500">
                    No spam, unsubscribe at any time. We respect your privacy.
                  </p>
                </form>
              </>
            ) : (
              <div className="text-center py-12">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckIcon className="w-8 h-8 text-green-600" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                  Successfully Subscribed!
                </h3>
                <p className="text-neutral-600 text-lg leading-relaxed mb-8">
                  Welcome to the AI Latent Space community! Check your email for confirmation.
                </p>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => setIsSubscribed(false)}
                >
                  Subscribe Another Email
                </Button>
              </div>
            )}
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 text-center mb-16">
            What You'll Get
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card variant="default" padding="lg" className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-4">
                Research Summaries
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                Weekly breakdowns of the latest AI research papers and their implications.
              </p>
            </Card>

            <Card variant="default" padding="lg" className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl">🛠️</span>
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-4">
                Tutorials & Guides
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                Step-by-step tutorials on implementing AI models and tools.
              </p>
            </Card>

            <Card variant="default" padding="lg" className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-4">
                Early Access
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                Be the first to know about new features and experiments.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
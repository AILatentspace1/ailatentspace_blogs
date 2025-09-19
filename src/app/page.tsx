import Link from 'next/link'

export default function Home() {
  const posts = [
    {
      slug: 'how-to-write-blog',
      title: 'How to Write Blog',
      date: '2024-09-19',
      excerpt: 'A comprehensive guide on blog writing techniques and best practices.'
    }
  ]

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to AI Latent Space
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Exploring the frontiers of artificial intelligence through daily research,
          insights, and technical deep-dives.
        </p>
      </div>

      <div className="grid gap-6">
        <h2 className="text-2xl font-semibold text-gray-900">Latest Posts</h2>
        {posts.map((post) => (
          <article key={post.slug} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <Link href={`/blog/${post.slug}`} className="block">
              <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600">
                {post.title}
              </h3>
              <p className="text-gray-600 mb-3">{post.excerpt}</p>
              <time className="text-sm text-gray-500">{post.date}</time>
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}
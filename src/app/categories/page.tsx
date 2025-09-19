import Link from 'next/link'

export default function CategoriesPage() {
  const categories = [
    {
      name: 'AI Papers',
      description: 'Latest research papers and academic insights',
      count: 12,
      color: 'from-blue-500 to-blue-600',
      href: '/categories/papers'
    },
    {
      name: 'Tools & Tech',
      description: 'AI tools, frameworks, and technology reviews',
      count: 8,
      color: 'from-green-500 to-green-600',
      href: '/categories/tools'
    },
    {
      name: 'Experiments',
      description: 'Hands-on AI experiments and practical guides',
      count: 15,
      color: 'from-purple-500 to-purple-600',
      href: '/categories/experiments'
    },
    {
      name: 'Tutorials',
      description: 'Step-by-step guides and educational content',
      count: 6,
      color: 'from-red-500 to-red-600',
      href: '/categories/tutorials'
    }
  ]

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Categories
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
              Explore different aspects of AI research and development organized by topic.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center mb-4`}>
                  <span className="text-white font-bold text-lg">
                    {category.name.charAt(0)}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {category.name}
                </h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{category.count} posts</span>
                  <span className="text-blue-600 font-medium text-sm">
                    Explore →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
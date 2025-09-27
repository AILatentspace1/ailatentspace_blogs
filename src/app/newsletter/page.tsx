export default function NewsletterPage() {
  return (
    <div className="animate-fade-in py-20">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Newsletter
        </h1>
        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          Stay updated with the latest AI research insights, technical tutorials, and industry trends.
        </p>

        <div className="bg-white border border-gray-200 rounded-lg p-8 max-w-md mx-auto">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Subscribe</h3>
          <form className="space-y-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
            >
              Subscribe
            </button>
          </form>
          <p className="text-sm text-gray-500 mt-4">
            No spam, unsubscribe at any time.
          </p>
        </div>
      </div>
    </div>
  )
}
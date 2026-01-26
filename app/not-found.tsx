export default function NotFound() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-16">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        The documentation page you're looking for doesn't exist.
      </p>
      <a
        href="/"
        className="text-blue-600 dark:text-blue-400 hover:underline"
      >
        ← Back to home
      </a>
    </div>
  )
}

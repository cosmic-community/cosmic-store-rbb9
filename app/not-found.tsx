import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-extrabold text-ink">404</h1>
      <p className="text-gray-500 mt-4 text-lg">
        We couldn&apos;t find what you were looking for.
      </p>
      <Link
        href="/"
        className="inline-block mt-8 bg-ink text-white px-8 py-3 font-medium hover:bg-carbon transition-colors rounded"
      >
        Back to Home
      </Link>
    </div>
  )
}
import Link from 'next/link'

export default function CheckoutCancelPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <div className="text-5xl mb-6">🛒</div>
      <h1 className="text-3xl font-bold text-ink">Checkout canceled</h1>
      <p className="text-gray-600 mt-4">
        No worries — your cart is still saved. You can pick up right where you
        left off whenever you are ready.
      </p>
      <Link
        href="/products"
        className="inline-block mt-10 bg-ink text-white px-8 py-4 font-medium hover:bg-carbon transition-colors rounded"
      >
        Back to Products
      </Link>
    </div>
  )
}

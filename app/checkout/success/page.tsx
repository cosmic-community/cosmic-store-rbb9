import Link from 'next/link'

export default function CheckoutSuccessPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <div className="text-5xl mb-6">🎉</div>
      <h1 className="text-3xl font-bold text-ink">Thank you for your order!</h1>
      <p className="text-gray-600 mt-4">
        Your payment was successful. A confirmation has been sent to your email.
        Your Cosmic swag is on its way!
      </p>
      <Link
        href="/products"
        className="inline-block mt-10 bg-ink text-white px-8 py-4 font-medium hover:bg-carbon transition-colors rounded"
      >
        Continue Shopping
      </Link>
    </div>
  )
}

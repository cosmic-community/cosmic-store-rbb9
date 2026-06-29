import Stripe from 'stripe'

const key = process.env.STRIPE_PRIVATE_KEY

if (!key) {
  // Do not throw at import time in case the build runs without the env var;
  // the API route will surface a clear error instead.
  console.warn('STRIPE_PRIVATE_KEY is not set. Checkout will fail until it is configured.')
}

export const stripe = new Stripe(key ?? '', {
  apiVersion: '2025-02-24.acacia',
})

import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

export const runtime = 'nodejs'

interface CheckoutItem {
  title: string
  price: number
  image?: string
  size?: string
  quantity: number
}

export async function POST(req: NextRequest) {
  if (!process.env.STRIPE_PRIVATE_KEY) {
    return NextResponse.json(
      { error: 'Stripe is not configured.' },
      { status: 500 }
    )
  }

  try {
    const body = (await req.json()) as { items?: CheckoutItem[] }
    const items = body.items ?? []

    if (items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty.' }, { status: 400 })
    }

    const origin =
      req.headers.get('origin') ??
      req.nextUrl.origin ??
      'http://localhost:3000'

    const line_items = items.map((item) => {
      const unitAmount = Math.round((item.price ?? 0) * 100)
      const productData: { name: string; images?: string[]; description?: string } = {
        name: item.size ? `${item.title} (Size: ${item.size})` : item.title,
      }
      if (item.image) {
        productData.images = [
          `${item.image}?w=600&h=600&fit=crop&auto=format,compress`,
        ]
      }
      return {
        price_data: {
          currency: 'usd',
          product_data: productData,
          unit_amount: unitAmount,
        },
        quantity: item.quantity,
      }
    })

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items,
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout/cancel`,
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'AU'],
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (e) {
    console.error('Checkout error', e)
    const message = e instanceof Error ? e.message : 'Checkout failed'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

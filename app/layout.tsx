import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { CartProvider } from '@/lib/cart-context'
import CartDrawer from '@/components/CartDrawer'

const OG_IMAGE = 'https://imgix.cosmicjs.com/5b973020-73f6-11f1-a87f-d72293b1048a-generated-1782763736063.jpg'
const SITE_URL = 'https://cosmic-store-rbb9.vercel.app'

export const metadata: Metadata = {
  title: 'Cosmic Store — Official Swag',
  description: 'Official Cosmic company swag. Hoodies, mugs, tees, stickers and more.',
  metadataBase: new URL(SITE_URL),
  keywords: ['Cosmic', 'swag', 'merch', 'hoodie', 'mug', 'sticker', 't-shirt', 'developer merch'],
  authors: [{ name: 'Cosmic', url: 'https://www.cosmicjs.com' }],
  openGraph: {
    type: 'website',
    url: SITE_URL,
    title: 'Cosmic Store — Official Swag',
    description: 'Official Cosmic company swag. Hoodies, mugs, tees, stickers and more.',
    siteName: 'Cosmic Store',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Cosmic Store — Premium gear for builders',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cosmic Store — Official Swag',
    description: 'Official Cosmic company swag. Hoodies, mugs, tees, stickers and more.',
    images: [OG_IMAGE],
    creator: '@cosmicjs',
    site: '@cosmicjs',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🛍️</text></svg>"
        />
        {/* Console capture script for dashboard debugging */}
        <script src="/dashboard-console-capture.js" />
        <script defer src="https://insights.cosmicinsights.dev/script.js" data-project="6a42be0a903866d6a2d3207d"></script>
      </head>
      <body className="font-sans bg-white text-ink antialiased">
        <CartProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  )
}

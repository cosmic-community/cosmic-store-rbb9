import Link from 'next/link'
import CartButton from '@/components/CartButton'

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-ink text-white border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <img
              src="https://cdn.cosmicjs.com/b67de7d0-c810-11ed-b01d-23d7b265c299-logo508x500.svg"
              alt="Cosmic Logo"
              className="w-7 h-7"
            />
            <span className="font-bold text-lg tracking-tight">COSMIC STORE</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="/" className="hover:text-accent transition-colors">
              Home
            </Link>
            <Link href="/products" className="hover:text-accent transition-colors">
              All Products
            </Link>
            <Link href="/collections" className="hover:text-accent transition-colors">
              Collections
            </Link>
          </nav>

          <div className="flex items-center gap-6 text-sm font-medium">
            <Link href="/products" className="md:hidden hover:text-accent transition-colors">
              Shop
            </Link>
            <CartButton />
          </div>
        </div>
      </div>
    </header>
  )
}

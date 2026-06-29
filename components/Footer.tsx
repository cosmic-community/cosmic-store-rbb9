import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-carbon text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img
                src="https://cdn.cosmicjs.com/b67de7d0-c810-11ed-b01d-23d7b265c299-logo508x500.svg"
                alt="Cosmic Logo"
                className="w-6 h-6"
              />
              <span className="font-bold tracking-tight">COSMIC STORE</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Official Cosmic company swag. Wear it loud, build it cosmic.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">Shop</h3>
            <ul className="space-y-2 text-sm text-white/60">
              <li>
                <Link href="/products" className="hover:text-accent transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/collections" className="hover:text-accent transition-colors">
                  Collections
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">About</h3>
            <ul className="space-y-2 text-sm text-white/60">
              <li>
                <a
                  href="https://www.cosmicjs.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors"
                >
                  Cosmic
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 text-center text-white/40 text-sm">
          © {year} Cosmic Store. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
# Cosmic Store

![App Preview](https://imgix.cosmicjs.com/cbe33450-73f6-11f1-a87f-d72293b1048a-generated-1782763924467.jpg?w=1200&h=630&fit=crop&auto=format,compress)

A sleek, modern e-commerce storefront for Cosmic company swag — built with Next.js 16 and powered by [Cosmic](https://www.cosmicjs.com). Browse hoodies, mugs, t-shirts, stickers, and bundles in a dark, minimalist design inspired by premium merch shops.

## Features

- 🛍️ **Product catalog** with featured products, sizes, and pricing
- 🗂️ **Collections** to group and browse merchandise
- 🖼️ **Image galleries** with imgix-optimized images
- 📱 **Fully responsive** dark-themed design inspired by shop.x.com
- ⚡ **Server Components** for fast, SEO-friendly data fetching
- 🎯 **Dynamic routes** for individual products and collections
- ♿ **Accessible** markup and keyboard navigation

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6a42be0a903866d6a2d3207f&clone_repository=6a42bee2903866d6a2d320ac)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a store for the Cosmic company swag. Products include: 1) Hoodie 2) Coffee Mug 3) T Shirt 4) Stickers and a 5) Box of all products. Sizes: S, M, L, XL. Style like https://shop.x.com. Factor these preferences into the content structure."

### Code Generation Prompt

> Build a Next.js application for a website called "Cosmic Store". The content is managed in Cosmic CMS with the following object types: collections, products. Create a beautiful, modern, responsive design with a homepage and pages for each content type. Style like https://shop.x.com.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- [Next.js 16](https://nextjs.org) (App Router)
- [React 19](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Cosmic](https://www.cosmicjs.com/docs)

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) or Node.js 18+
- A Cosmic account and bucket

### Installation

```bash
bun install
```

Create your environment variables (these are provided automatically in the Cosmic dashboard):

```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

Run the development server:

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Cosmic SDK Examples

```typescript
import { cosmic } from '@/lib/cosmic'

// Fetch all products with their collection (depth for connected objects)
const { objects: products } = await cosmic.objects
  .find({ type: 'products' })
  .props(['id', 'slug', 'title', 'metadata', 'type'])
  .depth(1)

// Fetch a single product by slug
const { object: product } = await cosmic.objects
  .findOne({ type: 'products', slug })
  .depth(1)
```

## Cosmic CMS Integration

This app reads from two object types:

- **collections** — `name`, `description`, `banner_image`
- **products** — `name`, `description`, `price`, `available_sizes`, `featured_image`, `gallery`, `collection`, `featured`

Learn more in the [Cosmic docs](https://www.cosmicjs.com/docs).

## Deployment Options

- **Vercel**: Import the repo and add your `COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY`, and `COSMIC_WRITE_KEY` env vars.
- **Netlify**: Same env vars, set build command `bun run build`.

<!-- README_END -->
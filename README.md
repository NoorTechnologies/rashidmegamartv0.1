# Rashid Mega Mart

A mobile-first grocery kits storefront built with Next.js, React, TypeScript and Tailwind CSS.

## Storefront

- Home page featuring available grocery kits.
- Searchable and sortable grocery kits catalogue.
- Individual kit detail pages with complete item lists and pricing.
- Persistent browser cart with quantity controls.
- WhatsApp checkout enquiry to **+91 89625 31603**.
- Privacy Policy and Terms & Conditions pages.
- Responsive desktop navigation and mobile bottom navigation.
- Search metadata, robots rules and sitemap.

## Order flow

Checkout opens WhatsApp with a prepared order enquiry. The site does not create server-side orders, process payments, or automatically verify stock, delivery charges or payment. The store must confirm the final order details.

Kit information is maintained in `src/data/kits.ts`. Verify prices, availability, contents and images before publishing changes.

## Tech stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Lucide React

## Requirements

- Node.js 22+
- npm

## Local development

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Quality checks

```bash
npm run lint
npm run typecheck
npm run build
```

GitHub Actions runs quality checks for pushes and pull requests targeting `main`.

## Project structure

```text
src/
  app/
    cart/
    kits/
    privacy-policy/
    terms-and-conditions/
  components/
  context/
  data/
public/
  images/
```

## Store contact

[WhatsApp: +91 89625 31603](https://wa.me/918962531603)

## Security

Never commit `.env*` files, API keys, passwords, tokens or other secrets.

## Deployment

The project is deployed on Vercel. Update the canonical site URL in metadata, robots and sitemap when the production domain changes.

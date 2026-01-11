# Next.js Fundamentals

Next.js is the React framework of choice for production applications. It provides routing, server-side rendering, and optimization out of the box—essential knowledge for Design Engineers building real products.

**App Router (Next.js 13+)**:
- File-based routing in `app/` directory
- `page.tsx` defines route content
- `layout.tsx` wraps children, persists across navigation
- Server Components by default (use `'use client'` for client components)

**Server vs Client Components**:
- **Server Components**: Render on server, no JS shipped to client. Use for static content, data fetching.
- **Client Components**: Render on client, enable interactivity. Use for state, effects, event handlers.

**Key Features**:
- **Image Optimization**: `next/image` for automatic optimization
- **Font Optimization**: `next/font` for self-hosted fonts
- **Metadata API**: SEO and Open Graph handling
- **API Routes**: Backend endpoints in your frontend repo

**For Design Engineers**: Next.js handles the production concerns (performance, SEO, deployment) so you can focus on crafting beautiful interfaces.

Visit the following resources to learn more:

- [@roadmap@Visit Dedicated Next.js Roadmap](https://roadmap.sh/nextjs)
- [@official@Next.js Documentation](https://nextjs.org/docs)
- [@article@App Router - Next.js](https://nextjs.org/docs/app)
- [@course@Next.js Learn](https://nextjs.org/learn)
- [@video@Next.js Tutorial - Lee Robinson](https://www.youtube.com/watch?v=gSSsZReIFRk)

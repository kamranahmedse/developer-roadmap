# API Endpoints 

API Routes let you create an API endpoint inside a Next.js app. API endpoints work differently in Pages routers and App Routers:

* Pages Router: Historically, Next.js used pages/api/* for APIs. This approach relied on Node.js request/response objects and an Express-like API.
* App Router (Default): Introduced in Next.js 13, the App Router fully embraces web standard Request/Response APIs. Instead of pages/api/*, you can now place `route.ts` or `route.js` files anywhere inside the app/ directory.

Visit the following resources to learn more:

- [@official@Route Handlers and Middleware](https://nextjs.org/docs/app/getting-started/route-handlers-and-middleware)
- [@official@API Routes for Pages Router](https://nextjs.org/docs/pages/building-your-application/routing/api-routes)
- [@official@Building APIs with Next.js](https://nextjs.org/blog/building-apis-with-nextjs)
- [@video@Next.js 15 Tutorial - Route Handlers](https://www.youtube.com/watch?v=27Uj6BeIDV0)
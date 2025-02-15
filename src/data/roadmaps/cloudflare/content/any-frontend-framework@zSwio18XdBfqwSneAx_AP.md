# Any Frontend Framework

When building frontend applications using Cloudflare Pages there are a few things kept in mind. Cloudflare Pages are mostly built on client-server architecture or a full-stack application. Those applications can be known as using React to create a frontend that dynamically interacts with the API without full-page reloads.

## Known Frameworks
There are a lot of frameworks which support this type of frontend handling. If you already know a framework feel free to check out if it supports the Cloudflare pages, also known as edge runtime. 

Frontend frameworks that are well known:
- Next.js ([Cloudflare-next-on-pages](https://github.com/cloudflare/next-on-pages))
- Astro ([astrojs/cloudflare](https://docs.astro.build/en/guides/integrations-guide/cloudflare/))
- Remix ([remix-run/cloudflare](https://remix.run/resources/remix-worker-template))
- [Nuxt 3](https://developers.cloudflare.com/workers/frameworks/framework-guides/nuxt/) (Experimental Cloudflare Support)

## Static HTML
Although you can use a framework to be at ease with some factors you can also use static HTML websites. If you manage your website without using a framework or static site generator, or if your framework is not listed in Framework guides, you can still deploy it using this guide. 

Visit the following resources to learn more:

- [@official@Cloudflare docs - Framework guides](https://developers.cloudflare.com/pages/framework-guides/)
- [@official@Cloudflare docs - Static HTML](https://developers.cloudflare.com/pages/framework-guides/deploy-anything/)
- [@video@Build a Full-Stack API with Cloudflare Pages Functions](https://www.youtube.com/watch?v=3zTJL3M57rE)

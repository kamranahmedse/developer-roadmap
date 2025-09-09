# Rendering Pages in Next.js

Rendering refers to the process of converting your code into HTML that can be displayed in a web browser. Next.js offers different strategies for this, including server-side rendering (SSR), static site generation (SSG), incremental static regeneration (ISR), and client-side rendering (CSR). Each method determines when and where the HTML is generated, impacting performance, SEO, and interactivity. Choosing the right rendering strategy depends on the specific needs of each page in your application.

Recently, Next.js has launched a partial prerendering feature, that allows you to combine static and dynamic content in the same route. This improves the initial page performance while still supporting personalized, dynamic data. However, this feature is currently experimental and subject to change, it's not recommended for production.

Visit the following resources to learn more:

- [@official@Rendering Strategies](https://nextjs.org/learn/seo/rendering-strategies)
- [@official@Partial Prerendering](https://nextjs.org/docs/app/getting-started/partial-prerendering)
- [@official@Rendering User Interfaces (UI)](https://nextjs.org/learn/react-foundations/rendering-ui)
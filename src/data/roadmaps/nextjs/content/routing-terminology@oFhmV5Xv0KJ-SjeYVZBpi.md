# Routing Terminology in Next.js

In Next.js, routing is primarily handled through the `app` directory (introduced in Next.js 13) and the older `pages` directory. Key terms include:

*   **Route:** A specific URL path that maps to a particular component or page. For example, `/blog/my-first-post`.

*   **Route Segment:** A part of the URL path. In `/blog/my-first-post`, `blog` and `my-first-post` are route segments.

*   **File-System Routing:** Next.js uses a file-system based router. The structure of your directories and files within the `app` or `pages` directory directly defines your application's routes.

*   **Dynamic Routes:** Routes that include parameters, allowing you to create pages based on data. For example, `/blog/[slug]` where `[slug]` is a dynamic parameter.

*   **Index Route:** The route that is served when a user visits a directory. Typically represented by an `index.js` or `page.js` file within a directory.

*   **Layout:** A component that wraps multiple pages, providing a consistent UI structure (like headers and footers) across different routes.

*   **Link Component:** The `<Link>` component from `next/link` is used for client-side navigation between routes, providing better performance than traditional `<a>` tags.

Visit the following resources to learn more:

- [@official@Project structure and organization](https://nextjs.org/docs/app/getting-started/project-structure)
- [@video@Next.js 15 Tutorial - Routing](https://www.youtube.com/watch?v=9602Yzvd7i)
- [@video@Next.js 15 Tutorial - Nested Routes](https://www.youtube.com/watch?v=H7JjKjkC33c)
- [@video@Next.js 15 Tutorial - Dynamic Routes](https://www.youtube.com/watch?v=k9g6aVLH3p4)
- [@video@Next.js 15 Tutorial - Nested Dynamic Routes](https://www.youtube.com/watch?v=edrJf0GKfAI)
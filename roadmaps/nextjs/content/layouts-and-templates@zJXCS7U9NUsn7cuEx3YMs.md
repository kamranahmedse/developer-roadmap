# Layouts and Templates

Layouts and templates provide a way to share UI elements across multiple pages, maintaining state and avoiding unnecessary re-renders. Layouts wrap around pages, persisting across route changes to preserve things like navigation bars or sidebars. 

Templates are similar to layouts in that they wrap each child layout or page. Unlike layouts that persist across routes and maintain state, templates create a new instance for each of their children on navigation. This means that when a user navigates between routes that share a template, a new instance of the component is mounted, DOM elements are recreated, state is not preserved, and effects are re-synchronized.

Visit the following resources to learn more:

- [@official@Layouts for App Router](https://nextjs.org/docs/app/api-reference/file-conventions/layout#root-layouts)
- [@official@Layouts for Pages Router](https://nextjs.org/docs/pages/building-your-application/routing/pages-and-layouts)
- [@official@Templates for App Router](https://nextjs.org/docs/app/api-reference/file-conventions/template)
- [@article@A guide to Next.js layouts and nested layouts](https://blog.logrocket.com/guide-next-js-layouts-nested-layouts/)
- [@video@Next.js 15 Tutorial - Layouts](https://www.youtube.com/watch?v=NK-8a8EzWrU)
- [@video@Next.js 15 Tutorial - Templates](https://www.youtube.com/watch?v=yfww2kplO-k)
# SPA vs SSG vs SSR

- **SPA**: A single page application loads only a single web document from the server and then updates the content of that document on demand via `Javascript APIs` without reloading the entire document. React, Vue, Angular are the top frameworks used to create single page applications.
- **SSR**: This technique uses a server like `Node.js` to fully render the web document upon the receival of a request and then send it back to the client. This way the user get an interactive document with all the necessary information without having to wait for any JavaScript or CSS files to load.
- **SSG**: Static site generation renders the web document in the server(like SSR), however the page is rendered at **build time**. So, instead of rendering the page on the server upon the receival of a request, the page is already rendered in the server, waiting to be served to the client.

Visit the following resources to learn more:

- [@article@Web Design Patterns — SSR, SSG, and SPA](https://medium.com/codex/web-design-patterns-ssr-ssg-and-spa-fadad7673dfe)
- [@article@Rendering on the Web](https://web.dev/rendering-on-the-web/)
- [@feed@Explore top posts about Web Development](https://app.daily.dev/tags/webdev?ref=roadmapsh)

# PRPL Pattern

The PRPL pattern is a performance optimization pattern for web applications that focuses on minimizing the time it takes for the initial rendering of a web page. It stands for Push, Render, Pre-cache, and Lazy-load, and it involves the following steps:

- Push: Prioritize the delivery of critical resources, such as HTML, CSS, and JavaScript, to the client as early as possible.
- Render: Start rendering the web page as soon as the critical resources are received, even if some non-critical resources are still being downloaded.
- Pre-cache: Pre-cache non-critical resources in the background so that they are available when needed.
- Lazy-load: Defer the loading of non-critical resources until they are needed, such as when the user scrolls to them or interacts with them.

The PRPL pattern is designed to improve the perceived performance of a web page by reducing the time it takes for the page to become interactive. It is particularly useful for applications that are served over slow or unreliable networks, as it allows the page to render as quickly as possible and then gradually load the remaining resources.

Visit the following resources to learn more:

- [PRPL Pattern - Google Developers](https://developers.google.com/web/fundamentals/performance/prpl-pattern)

Server-side rendering (SSR) is a technique in which a web server generates the HTML content of a web page and sends it to the client (usually a web browser) as a fully rendered document. This is the opposite of what naturally happens with client-side rendering (CSR), where the browser downloads a minimal HTML page and then uses JavaScript to render the content dynamically.

There are several ideal use cases for SSR:

- **Content-rich websites**. For example, news sites, blogs, etc.
- **SEO-heavy applications**. When the success of the web app relies on SEO, this approach can greatly improve the performance of the site (and because of that, the SEO performance).
- **Progressive web applications**. When the application needs to render fast to provide a fast and performance user experience, the application can initially be rendered on the server, and then hydrated on the client for subsequent integrations.

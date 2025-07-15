# DevTools

While you can't directly use traditional browser DevTools with Cloudflare Workers running on the edge, you can leverage similar debugging principles. Cloudflare offers tools like `wrangler tail` for real-time logging and the ability to inspect request/response headers. Using `console.log` strategically within your Worker code and analyzing the output via `wrangler tail` is the primary way to inspect variables and execution flow, emulating some DevTools functionality.

Visit the following resources to learn more:

- [@official@Chrome DevTools](https://developer.chrome.com/docs/devtools)
- [@official@Overview | Chrome DevTools | Chrome for Developers](https://developer.chrome.com/docs/devtools/overview/)
- [@official@Debugging Cloudflare Workers](https://developers.cloudflare.com/workers/playground/#devtools)

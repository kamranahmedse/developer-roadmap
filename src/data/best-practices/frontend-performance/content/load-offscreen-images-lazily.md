# Lazy Loading

> Offscreen images are loaded lazily (A noscript fallback is always provided).

It will improve the response time of the current page and then avoid loading unnecessary images that the user may not need.

- Use Lighthouse to identify how many images are offscreen.
- Use a JavaScript plugin like the following to lazyload your images. Make sure you target offscreen images only.
- Also make sure to lazyload alternative images shown at mouseover or upon other user actions.

- [verlok/lazyload: GitHub](https://github.com/verlok/lazyload)
- [aFarkas/lazysizes: GitHub](https://github.com/aFarkas/lazysizes/)
- [mfranzke/loading-attribute-polyfill: GitHub](https://github.com/mfranzke/loading-attribute-polyfill/)
- [Lazy Loading Images and Video | Web Fundamentals | Google Developers](https://developers.google.com/web/fundamentals/performance/lazy-loading-guidance/images-and-video/)
- [5 Brilliant Ways to Lazy Load Images For Faster Page Loads - Dynamic Drive Blog](http://blog.dynamicdrive.com/5-brilliant-ways-to-lazy-load-images-for-faster-page-loads/)

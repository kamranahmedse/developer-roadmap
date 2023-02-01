# Non-Blocking CSS

> CSS files need to be non-blocking to prevent the DOM from taking time to load.

CSS files can block the page load and delay the rendering of your page. Using `preload` can actually load the CSS files before the browser starts showing the content of the page.

You need to add the `rel` attribute with the preload value and add `as="style"` on the `<link>` element.

- [loadCSS by filament group](https://github.com/filamentgroup/loadCSS)
- [Example of preload CSS using loadCSS](https://gist.github.com/thedaviddias/c24763b82b9991e53928e66a0bafc9bf)
- [Preloading content with rel="preload"](https://developer.mozilla.org/en-US/docs/Web/HTML/Preloading_content)
- [Preload: What Is It Good For? — Smashing Magazine](https://www.smashingmagazine.com/2016/02/preload-what-is-it-good-for/)
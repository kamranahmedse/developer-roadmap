The main difference between `defer` and `async` is the order of execution.

## Defer attribute

A `<script>` element with a `defer` attribute, it will continue to load the HTML page and render it while the script is being downloaded. The script is executed after the HTML page has been completely parsed. `defer` scripts maintain their order in the document.

```html
<script defer src="script1.js"></script>
<script defer src="script2.js"></script>
```

In the example above, `script1.js` will be executed before `script2.js`. The browser will download both scripts in parallel, but `script1.js` will be executed after the HTML page has been parsed and `script2.js` will be executed after `script1.js` has been executed.

## Async attribute

On the other hand, A `<script>` element with an `async` attribute, it will pause the HTML parser and execute the script immediately after it has been downloaded. The HTML parsing will resume after the script has been executed.

```html
<script async src="script1.js"></script>
<script async src="script2.js"></script>
```

In the example above, the browser will download both scripts in parallel, and execute them as soon as they are downloaded. The order of execution is not guaranteed.

To know more you can check [this diagram](https://roadmap.sh/guides/avoid-render-blocking-javascript-with-async-defer) from us that explains the difference between `defer` and `async` in a visual way.

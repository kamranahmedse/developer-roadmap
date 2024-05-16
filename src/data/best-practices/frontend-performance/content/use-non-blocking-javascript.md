# Non-Blocking JavaScript

JavaScript files are loaded asynchronously using async or deferred using defer attribute.

```javascript
<!-- Defer Attribute -->
<script defer src="foo.js"></script>

<!-- Async Attribute -->
<script async src="foo.js"></script>
```

JavaScript blocks the normal parsing of the HTML document, so when the parser reaches a `<script>` tag (particularly is inside the `<head>`), it stops to fetch and run it. Adding async or defer are highly recommended if your scripts are placed in the top of your page but less valuable if just before your `</body>` tag. But it's a good practice to always use these attributes to avoid any performance issue.

- Add `async` (if the script doesn't rely on other scripts) or `defer` (if the script relies upon or is relied upon by an async script) as an attribute to your script tag.
- If you have small scripts, maybe use inline script place above async scripts.

- [Remove Render-Blocking JavaScript](https://developers.google.com/speed/docs/insights/v5/get-started)

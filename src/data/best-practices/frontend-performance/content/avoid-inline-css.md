# Avoid Inline CSS

> Avoid using embed or inline CSS inside your `<body>` (Not valid for HTTP/2)

One of the first reasons is because it's a good practice to separate content from design. It also helps you have a more maintainable code and keep your site accessible. But regarding performance, it's simply because it decreases the file size of your HTML pages and the load time.

Always use external stylesheets or embed CSS in your `<head>` (and follow the others CSS performance rules)

- [Observe CSS Best Practices: Avoid CSS Inline Styles](https://www.lifewire.com/avoid-inline-styles-for-css-3466846)

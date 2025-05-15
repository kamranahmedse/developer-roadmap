## Advanced concepts

You can add JavaScript to an HTML file in three ways: **inline, internal, and external JavaScript**. Internal JavaScript lets you add code inside the HTML markup file between `<script>` tags. You can place internal JavaScript code inside the `<head>` or `<body>` section.

Internal JavaScript is great for small amounts of code and keeps everything in one place. But it can mess up your HTML markup file and make it hard to read, especially if you have a lot of code.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Practice</title>

<!-- JavaScript -->

<script>
  console.log("Study Javascript");
</script>

<!-- End  -->


</head>
<body>


<!-- JavaSCript -->

<script>
    console.log("Hi, I'm Cess");
</script>

<!-- End -->

</body>
</html>
```

Another method is to create an external file for your JavaScript. It lets you write your JavaScript code in a separate .js extension and link it to your HTML code file. You can link to the external JavaScript in your HTML's `<head>` or `<body>` section.

Doing this keeps your HTML clean and lets you use the same JavaScript code in many HTML pages. The downside is that it means an extra HTTP request to load the JavaScript file, which might slow down how fast your page loads.

For example, when you create a file called `app.js`, you'll include it like this:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Practice</title>

<!-- JavaScript -->

<script src="app.js"></script>

<!-- End -->

</head>

<body>

<!-- JavaSCript -->

<script src="app.js"></script>

<!-- End -->

</body>

</html>
```

Inline JavaScript lets you place your JavaScript code into an HTML element's attribute. You can do this using an HTML element's attribute, like onclick, onsubmit, and onselect.

Using inline JavaScript is suitable for fast and easy tasks. But it can make your HTML code difficult to read, especially if you have a lot of JavaScript code.

```html
<button onclick="console.log('A click occured')">
      Sign up on roadmap.sh
</button>
``` 
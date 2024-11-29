# v-html

The `v-html` directive is similar to the `v-text` directive, but the difference is that `v-html` renders its content as HTML. This means that if you pass an HTML element it will be rendered as an element and not plain text. Since the content is render as HTML, it can pose a security risk if the content contains malicious JavaScript code. For this reason you should never use this directive in combination with user input, unless the input is first properly sanitized.

## Example

```html
<template>
  <p v-html="'<h1>Text</h1>'"></p>
</template>
```

Visit the following resources to learn more:

- [@official@v-html Documentation](https://vuejs.org/api/built-in-directives.html#v-html)

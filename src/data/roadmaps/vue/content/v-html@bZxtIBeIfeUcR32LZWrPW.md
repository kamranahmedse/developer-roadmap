# v-html

The `v-thml` directive is similar to the `v-text` directive, but the difference is that `v-html` renders its content as HTML. This means that if you pass an HTML element it will be rendered as an element and not plain text. Since the content is render as HTMl, it can pose a security risk if the content contains malicius JavaScript code. For this reason you should never use this directive in combination with user input, unless the input is first properly sanitized.

Example:
```vue
<template>
  <p v-html="'<h1>Text</h1>'"></p>
</template>
```

Visit the following resources to learn more:

- [@official@v-html documentation](https://vuejs.org/api/built-in-directives.html#v-html)

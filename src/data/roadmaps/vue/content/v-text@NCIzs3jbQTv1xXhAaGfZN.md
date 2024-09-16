# v-text

The `v-text` directive is used to set the textContent property of an element. It's important to note that when using this directive it will overwrite the HTML content inside the element.
The expected input is a string, so it's important to wrap any text in single quotes.

Example:
```vue
<template>
  <p v-text="'I am some text'"></p>
</template>
```

Visit the following resources to learn more:

- [@official@v-text documentation](https://vuejs.org/api/built-in-directives.html#v-text)

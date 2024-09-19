# v-slot

The v-slot directive to define slots in components, allowing you to pass and render content dynamically inside a component.

For named slots, you use v-slot with a specific slot name. This lets you pass different content to different parts of a component:

```vue
<template>
  <custom-component>
    <template v-slot:header>
      <h1>Header Content</h1>
    </template>
    <template v-slot:footer>
      <p>Footer Content</p>
    </template>
  </custom-component>
</template>
```

The shorthand for `v-slot` is `#`, for example `v-slot:header` becomes `#header`.

Visit the following resources to learn more:

- [@official@v-slot documentation](https://vuejs.org/api/built-in-directives.html#v-slot)

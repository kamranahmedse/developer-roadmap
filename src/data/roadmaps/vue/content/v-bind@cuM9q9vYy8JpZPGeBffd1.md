# v-bind

The `v-bind` directive dynamically binds an HTML attribute to data.

The shorthand for this directive is `:`

Example:
```vue
<script setup>
  import { ref } from 'vue';
  const image_url = ref("path/to/image.png")
</script>

<template>
  <img :src="image_url" />
</template>
```

Visit the following resources for more information:

- [@official@v-bind documentation](https://vuejs.org/api/built-in-directives.html#v-bind)

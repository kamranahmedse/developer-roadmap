# v-once

The `v-once` directive makes an HTML element render only once, skipping every future update.

Example:
```vue
<script setup>
  import { ref } from 'vue';
  const input = ref("Some Text");
</script>

<template>
  <input v-model="input">
  <p v-once>{{ input }}</p>
</template>
```
In this example the **p** element will not change its text even if the input variable is changed through the **input** element.

Visit the following resources to learn more:

- [@official@v-once documentation](https://vuejs.org/api/built-in-directives.html#v-once)

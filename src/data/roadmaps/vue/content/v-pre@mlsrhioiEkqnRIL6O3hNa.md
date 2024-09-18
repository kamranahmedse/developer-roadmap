# v-pre

The `v-pre` directive makes an element render its content as-is, skipping its compilation. The most common use case is when displaying raw mustache syntax.

Example:
```vue
<script setup>
  import { ref } from 'vue';
  const text = ref("Some Text")
</script>

<template>
  <p v-pre >{{ text }}</p>
</template>
```
The **p** element will display: `{{ text }}` and not `Some Text` because the compilation is skipped.

Visit the following resources to learn more:

- [@official@v-pre Documentation](https://vuejs.org/api/built-in-directives.html#v-pre)

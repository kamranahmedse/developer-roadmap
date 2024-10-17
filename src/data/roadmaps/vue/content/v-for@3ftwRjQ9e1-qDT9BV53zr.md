# v-for

The `v-for` directive is used to render an HTML element, a block of elements, or even a component based on an array, an object, or a set number of times.
When using this directive it is important to assign a unique key to each item to avoid issues and improve performance. This directive follows the `item in items` syntax.

## Example

```html
<script setup>
  import { ref } from 'vue';
  const foods = ref([
    {id: 1, name: "apple"},
    {id: 2, name: "pear"},
    {id: 3, name: "pizza"}
  ]);
</script>

<template>
  <p v-for="food in foods" :key="food.id">{{ food.name }}</p>
</template>
```

Visit the following resources to learn more:

- [@official@v-for Documentation](https://vuejs.org/guide/essentials/list#v-for)

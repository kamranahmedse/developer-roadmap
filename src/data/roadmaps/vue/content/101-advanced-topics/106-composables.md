# Composables

In the context of Vue applications, a "composable" is a function that leverages Vue's Composition API to encapsulate and reuse stateful logic.

When building frontend applications, we often need to reuse logic for common tasks. For example, we may need to format dates in many places, so we extract a reusable function for that. This formatter function encapsulates stateless logic: it takes some input and immediately returns expected output. There are many libraries out there for reusing stateless logic - for example lodash and date-fns, which you may have heard of.

Visit the following resources to learn more:

- [@article@Vue.js Composables](https://vuejs.org/guide/reusability/composables.html)
- [@video@What is a Composable? (Vue 3)](https://www.youtube.com/watch?v=h8yveYCbFQM)

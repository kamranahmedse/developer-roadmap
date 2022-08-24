# Composables

In the context of Vue applications, a "composable" is a function that leverages Vue's Composition API to encapsulate and reuse stateful logic.

When building frontend applications, we often need to reuse logic for common tasks. For example, we may need to format dates in many places, so we extract a reusable function for that. This formatter function encapsulates stateless logic: it takes some input and immediately returns expected output. There are many libraries out there for reusing stateless logic - for example lodash and date-fns, which you may have heard of.

<ResourceGroupTitle>Free Content</ResourceGroupTitle>
<BadgeLink colorScheme='blue' badgeText='Official Docs' href='https://vuejs.org/guide/reusability/composables.html'>Vue.js Composables</BadgeLink>

<BadgeLink colorScheme='red' badgeText='Watch' href='https://www.youtube.com/watch?v=h8yveYCbFQM'>What is a Composable? (Vue 3)</BadgeLink>


# v-once

v-once is a built-in directive used to render an element or component only once and skip future updates during subsequent re-renders. Once the initial content is rendered, the data bindings are removed, meaning any changes to the associated data will not trigger updates to that specific part of the DOM. This can be useful for optimizing performance when dealing with static content that does not need to change after the initial load.

Visit the following resources to learn more:

- [@official@v-once Documentation](https://vuejs.org/api/built-in-directives.html#v-once)
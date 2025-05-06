# API Styles

Though Vue 2 supported many approaches to writing components, only one approach, the "Options API", was built in and accessible without plugins. Vue 3, retains the Options API (OAPI), and adds in the Composition API (CAPI). Composition API itself is actually a part of the Options API, but moves most of the component logic into a setup function. This led to a 3rd approach to writing components being built in called "script/setup", which removes much of the boilerplate from Composition API. These approaches are not mutually exclusive. Each component in your project can use any of these approaches, however for consistency it is recommended to stick primarily to one, and only deviate to one of the others when you have a good reason.

Visit the following resources to learn more:

- [@article@The Difference Between the Composition API and Options API in Vue](https://fjolt.com/article/vue-composition-api-vs-options-api)

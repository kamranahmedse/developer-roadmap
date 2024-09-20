# v-cloak

The v-cloak directive is used to prevent the uncompiled Vue template from being visible while the Vue instance is still loading. It temporarily hides the content until Vue has finished compiling the template

The v-cloak directive remains until the component instance is mounted.
```vue
<div v-cloak>
  {{ message }}
</div>
```

Combined with CSS, you can hide elements with v-cloak until they are ready.
```css
[v-cloak] {
  display: none;
}
```
The `<div>` will not be visible until the compilation is done.

Visit the following resources to learn more:

- [@official@v-cloak documentation](https://vuejs.org/api/built-in-directives.html#v-cloak)

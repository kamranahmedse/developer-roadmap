To make an object immutable, you can use `Object.freeze()` method. It prevents the modification of existing property values and prevents the addition of new properties.

```js
const roadmap = {
  name: 'JavaScript',
};

Object.freeze(roadmap);

roadmap.name = 'JavaScript Roadmap'; // throws an error in strict mode
console.log(roadmap.name); // JavaScript
```

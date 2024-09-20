The spread operator in JavaScript is represented by three dots (`...`). It allows the elements of an array or properties of an object to be expanded or "spread" into individual elements or properties. This can be useful in various contexts, such as when passing elements as function arguments, cloning arrays and objects, or merging arrays and objects.

```js
const roadmaps = ['JavaScript', 'React', 'Node.js'];
const bestPractices = ['AWS', 'API Security'];

const resources = [...roadmaps, ...bestPractices];
console.log(resources); // ['JavaScript', 'React', 'Node.js', 'AWS', 'API Security']
```

```js
const roadmap = {
  name: 'JavaScript',
  type: 'dynamic',
};

const roadmapClone = { ...roadmap }; // shallow copy
console.log(roadmapClone); // { name: 'JavaScript', type: 'dynamic' }
```

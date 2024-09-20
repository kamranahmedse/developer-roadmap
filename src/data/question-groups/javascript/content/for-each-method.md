No, the `forEach()` method does not return a new array. It simply calls a provided function on each element in the array.

```js
const roadmaps = ['JavaScript', 'React', 'Node.js'];

roadmaps.forEach((roadmap) => {
  console.log(roadmap);
});
```

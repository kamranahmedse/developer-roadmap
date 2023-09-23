Set is another data structure in JavaScript which is similar to `Array` but the values are unique. It is a collection of elements where each element is stored as a value without any keys.

```js
const roadmap = new Set();
roadmap.add('JavaScript');
roadmap.add('dynamic');
roadmap.add(1995);

console.log(roadmap.has('JavaScript')); // true

roadmap.delete(1995);
console.log(roadmap.has(1995)); // false
console.log(roadmap.size); // 2
```

Map is another data structure in JavaScript which is similar to `Object` but the key can be of any type. It is a collection of elements where each element is stored as a Key, value pair. It is also known as a Hash table or a dictionary.

The `key` can be of any type but the `value` can be of any type. The `key` is unique and immutable, whereas the `value` can be mutable or immutable.

```js
const roadmap = new Map();
roadmap.set('name', 'JavaScript');
roadmap.set('type', 'dynamic');
roadmap.set('year', 1995);

console.log(roadmap.get('name')); // JavaScript

roadmap.delete('year');
console.log(roadmap.has('year')); // false
console.log(roadmap.size); // 2

roadmap.clear();
console.log(roadmap.size); // 0
```

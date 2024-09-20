In order to parse JSON, you can use the `JSON.parse()` method. It parses a JSON string and returns the JavaScript equivalent.

```js
const json = '{"name":"JavaScript","year":1995}';
const roadmap = JSON.parse(json);

console.log(roadmap.name); // JavaScript
console.log(roadmap.year); // 1995
```

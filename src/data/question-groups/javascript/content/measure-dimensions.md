You can use `getBoundingClientRect` method to get the dimensions of an element.

```js
const roadmapWrapper = document.querySelector('.roadmap-wrapper');
const dimensions = roadmapWrapper.getBoundingClientRect();

console.log(dimensions); // DOMRect { x: 8, y: 8, width: 784, height: 784, top: 8, right: 792, bottom: 792, left: 8 }
```

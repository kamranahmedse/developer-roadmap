To remove a DOM element, you can use the `remove` or `removeChild` method of the `Node` interface.

```js
const roadmapWrapper = document.querySelector('.roadmap-wrapper');
const roadmapTitle = document.querySelector('#roadmap-title');

roadmapWrapper.removeChild(roadmapTitle);
roadmapWrapper.remove();
```

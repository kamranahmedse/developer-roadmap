You can add a new element to the DOM using the `appendChild` or `insertBefore` method.

## appendChild

The `appendChild` method adds a new element as the last child of the specified parent element.

```js
const roadmapWrapper = document.querySelector('.roadmap-wrapper');

const roadmap = document.createElement('div');
roadmap.id = 'javascript-roadmap';

roadmapWrapper.appendChild(roadmap);
```

In the example above, the `roadmap` element is added as the last child of the `roadmapWrapper` element.

## insertBefore

The `insertBefore` method adds a new element before the specified child element.

```js
const roadmapWrapper = document.querySelector('.roadmap-wrapper');

const roadmap = document.createElement('div');
roadmap.id = 'javascript-roadmap';

const roadmapTitle = document.querySelector('#roadmap-title');
roadmapWrapper.insertBefore(roadmap, roadmapTitle);
```

In the example above, the `roadmap` element is added before the `roadmapTitle` element.

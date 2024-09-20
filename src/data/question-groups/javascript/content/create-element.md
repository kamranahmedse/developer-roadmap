To create a new DOM element, you can use the `document.createElement` method. It accepts a tag name as an argument and returns a new element with the specified tag name. You can set attributes to the element.

```js
const div = document.createElement('div');

div.id = 'roadmap-wrapper';
div.setAttribute('data-id', 'javascript');
console.log(div); // <div id="roadmap-wrapper" data-id="javascript"></div>
```

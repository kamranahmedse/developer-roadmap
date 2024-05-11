For selecting elements in the DOM, the `querySelector` and `querySelectorAll` methods are the most commonly used. They are both methods of the `document` object, and they both accept a CSS selector as an argument.

## querySelector

The `querySelector` method returns the first element that matches the specified selector. If no matches are found, it returns `null`.

```js
const roadmapWrapper = document.querySelector('.roadmap-wrapper');
const roadmapTitle = document.querySelector('#roadmap-title');
```

## querySelectorAll

The `querySelectorAll` method returns a `NodeList` of all elements that match the specified selector. If no matches are found, it returns an empty `NodeList`.

```js
const roadmapItems = document.querySelectorAll('.roadmap-item');
```

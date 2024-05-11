Event bubbling is a concept in the Document Object Model (DOM) that describes the way in which events propagate or "bubble up" through the hierarchy of nested elements in the DOM.

When an event, such as a mouse click, occurs on a DOM element, the event will be handled by the element first, then its parent element, and so on, until the event reaches the root element. This behavior is called event bubbling.

```js
const parent = document.querySelector('.parent');
const child = document.querySelector('.child');

// Scenario of clicking on the child element
parent.addEventListener('click', () => {
  console.log('Handled Last');
});

child.addEventListener('click', () => {
  console.log('Handled First');
});
```

In the above example, when you click on the `child` element, the event will be handled by the `child` element first, then its parent element, and so on, to the root element unless you stop the propagation (`event.stopPropagation()`) of the event.

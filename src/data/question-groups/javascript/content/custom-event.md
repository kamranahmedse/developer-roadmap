You can use the `CustomEvent` constructor to create a custom event. The `CustomEvent` constructor accepts two arguments: the event name and an optional object that specifies the event options. And you can use the `dispatchEvent` method to dispatch the custom event on the target element/document.

## Creating Custom Events

```js
const event = new CustomEvent('roadmap-updated', {
  detail: { name: 'JavaScript' },
});
element.dispatchEvent(event);
```

## Listening for Custom Events

You can listen for custom events using the `addEventListener` method. The `addEventListener` method accepts the event name and a callback function that is called when the event is dispatched.

```js
element.addEventListener('roadmap-updated', (event) => {
  console.log(event.detail); // { name: 'JavaScript' }
});
```

## Removing Event Listeners

You can remove event listeners using the `removeEventListener` method. The `removeEventListener` method accepts the event name and the callback function that was used to add the event listener.

```js
function handleEvent(event) {
  console.log(event.detail); // { name: 'JavaScript' }
}

element.addEventListener('roadmap-updated', handleEvent);
element.removeEventListener('roadmap-updated', handleEvent);
```

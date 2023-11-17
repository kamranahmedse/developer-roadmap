The `event.preventDefault()` method is used to prevent the default action of an event. For example, when you click on a link, the default action is to navigate to the link's URL. But, if you want to prevent the navigation, you can use `event.preventDefault()` method.

```js
const link = document.querySelector('a');

link.addEventListener('click', (event) => {
  event.preventDefault();
  console.log('Clicked on link!');
});
```

# This in event handlers

The keyword `this` when used in an event handler refers to the element that received the event.

**Example**

```js
const button = document.querySelector('button');
button.addEventListener('click', function () {
  console.log(this);
});
```

**Output**

```js
<button>Click me</button>
```

<ResourceGroupTitle>Free Content</ResourceGroupTitle>
<BadgeLink colorScheme='yellow' badgeText='Read' href='https://www.w3schools.com/js/js_this.asp'>this in Event handlers</BadgeLink>
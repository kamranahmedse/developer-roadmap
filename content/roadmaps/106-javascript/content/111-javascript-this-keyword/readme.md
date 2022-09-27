# This Keyword

In JavaScript, the `this` keyword is a little different compared to other languages. It refers to an object, but it depends on how or where it is being invoked. It also has some differences between strict mode and non-strict mode.

- In an object method, `this` refers to the object
- Alone, `this` refers to the global object
- In a function, `this` refers to the global object
- In a function, in strict mode, `this` is undefined
- In an event, `this` refers to the element that received the event
- Methods like call(), apply(), and bind() can refer `this` to any object

<BadgeLink colorScheme='yellow' badgeText='Read' href='https://www.w3schools.com/js/js_this.asp'>The JavaScript `this` Keyword</BadgeLink>
<BadgeLink colorScheme='yellow' badgeText='Read' href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this'>This Keyword</BadgeLink>


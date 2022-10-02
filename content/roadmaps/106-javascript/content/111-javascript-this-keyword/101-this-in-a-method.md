# This in a method

the keyword `this` when used in a method refers to the object that the method is called on.

**Example**

```js
const person = {
  name: 'John',
  age: 30,
  greet: function () {
    console.log(`Hello, my name is ${this.name}`);
  },
};
```

**Output**

```js
Hello, my name is John
```

<ResourceGroupTitle>Free Content</ResourceGroupTitle>
<BadgeLink colorScheme='yellow' badgeText='Read' href='https://www.w3schools.com/js/js_this.asp'>this in a Method</BadgeLink>

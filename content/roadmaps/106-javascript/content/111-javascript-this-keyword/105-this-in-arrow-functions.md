# This in arrow functions

The keyword `this` when used in an arrow function refers to the parent object.

**Example**

```js
const person = {
  name: 'John',
  age: 30,
  greet: () => {
    console.log(`Hello, my name is ${this.name}`);
  }
};
```

**Output**

```js
Hello, my name is undefined
```

<ResourceGroupTitle>Free Content</ResourceGroupTitle>
<BadgeLink colorScheme='yellow' badgeText='Read' href='https://stackoverflow.com/questions/66518020/javascript-this-keyword-and-arrow-function'>this keyword and arrow function</BadgeLink>
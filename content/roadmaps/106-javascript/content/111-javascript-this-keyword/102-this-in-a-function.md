# This in a function

The keyword `this` when used in a function refers to the global object.

*Note: in a browser window the global object is the `window` object.*

**Example**

```js
function greet() {
  console.log(`Hello, my name is ${this.name}`);
}
```

**Output**

```js
Hello, my name is undefined
```


<ResourceGroupTitle>Free Content</ResourceGroupTitle>
<BadgeLink colorScheme='yellow' badgeText='Read' href='https://www.w3schools.com/js/js_this.asp'>this in a function</BadgeLink>
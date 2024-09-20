The prototype chain in JavaScript refers to the chain of objects linked by their prototypes. When a property or method is accessed on an object, JavaScript first checks the object itself. If it doesn't find it there, it looks up the property or method in the object's prototype. This process continues, moving up the chain from one prototype to the next, until the property or method is found or the end of the chain is reached (typically the prototype of the base object, which is `null`). The prototype chain is fundamental to JavaScript's prototypal inheritance model, allowing objects to inherit properties and methods from other objects.

## Example

```js
const roadmap = {
  getRoadmapUrl() {
    console.log(`https://roadmap.sh/${this.slug}`);
  },
};

const javascript = {
  name: 'JavaScript Roadmap',
  description: 'Learn JavaScript',
  slug: 'javascript',
  greet() {
    console.log(`${this.name} - ${this.description}`);
  },
};

Object.setPrototypeOf(javascript, roadmap); // or javascript.__proto__ = roadmap;

javascript.getRoadmapUrl(); // https://roadmap.sh/javascript
javascript.greet(); // JavaScript Roadmap - Learn JavaScript
```

In the above example, the `javascript` object inherits the `getRoadmapUrl()` method from the `roadmap` object. This is because the `javascript` object's prototype is set to the `roadmap` object using the `Object.setPrototypeOf()` method. In the `javascript` object, the `getRoadmapUrl()` method is not found, so JavaScript looks up the prototype chain and finds the `getRoadmapUrl()` method in the `roadmap` object.

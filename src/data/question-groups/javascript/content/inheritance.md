Inheritance is a way to create a new `Class` from an existing `Class`. The new `Class` inherits all the properties and methods from the existing `Class`. The new `Class` is called the child `Class`, and the existing `Class` is called the parent `Class`.

## Example

```js
class Roadmap {
  constructor(name, description, slug) {
    this.name = name;
    this.description = description;
    this.slug = slug;
  }

  getRoadmapUrl() {
    console.log(`https://roadmap.sh/${this.slug}`);
  }
}

class JavaScript extends Roadmap {
  constructor(name, description, slug) {
    super(name, description, slug);
  }

  greet() {
    console.log(`${this.name} - ${this.description}`);
  }
}

const js = new JavaScript(
  'JavaScript Roadmap',
  'Learn JavaScript',
  'javascript'
);

js.getRoadmapUrl(); // https://roadmap.sh/javascript
js.greet(); // JavaScript Roadmap - Learn JavaScript
```

In the above example, the `JavaScript` class inherits the `getRoadmapUrl()` method from the `Roadmap` class. This is because the `JavaScript` class extends the `Roadmap` class using the `extends` keyword. In the `JavaScript` class, the `getRoadmapUrl()` method is not found, so JavaScript looks up the prototype chain and finds the `getRoadmapUrl()` method in the `Roadmap` class.

# Classes

Classes in TypeScript are a blueprint for creating objects (instances of a class), providing a way to structure objects and encapsulate data and behavior. Classes in TypeScript have a similar syntax to classes in other object-oriented programming languages, such as Java and C#.

A class in TypeScript is defined using the class keyword, followed by the name of the class. The class definition can include fields (also known as properties or attributes), methods (functions), and a constructor.

```typescript
class Animal {
  name: string;
  constructor(name: string) {
    this.name = name;
  }

  makeSound(): void {
    console.log(`${this.name} is making a sound`);
  }
}

const dog = new Animal('Dog');
dog.makeSound(); // Output: Dog is making a sound
```

In this example, the `Animal` class has a name field, a constructor that sets the value of the `name` field, and a `makeSound` method. An instance of the `Animal` class can be created using the `new` keyword, and its methods and properties can be accessed using dot notation.

Learn more from the following resources:

- [@official@Tutorial - Classes](https://www.typescriptlang.org/docs/handbook/2/classes.html)

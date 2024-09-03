# Abstract Classes

Abstract classes in TypeScript are classes that cannot be instantiated on their own and must be subclassed by other classes. Abstract classes provide a blueprint for other classes and can have abstract methods, which are methods without a body and must be overridden by the subclass. These classes are useful for defining a common interface or basic functionality that other classes can inherit and build upon.

```typescript
abstract class Animal {
  abstract makeSound(): void;

  move(): void {
    console.log('moving...');
  }
}

class Dog extends Animal {
  makeSound(): void {
    console.log('bark');
  }
}
```

Learn more from the following resources:

- [@official@Abstract Classes](https://www.typescriptlang.org/docs/handbook/2/classes.html#abstract-classes-and-members)

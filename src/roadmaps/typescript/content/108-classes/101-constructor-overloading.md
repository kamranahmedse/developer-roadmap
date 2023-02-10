# Constructor Overloading

In TypeScript, you can achieve constructor overloading by using multiple constructors with different parameter lists in a single class. When you create an instance of the class, the constructor with the matching parameter list is called. Here's an example:

```typescript
class MyClass {
  property1: number;
  property2: string;

  constructor(property1: number) {
    this.property1 = property1;
  }

  constructor(property1: number, property2: string) {
    this.property1 = property1;
    this.property2 = property2;
  }
}
```

In this example, we have two constructors with different parameter lists: constructor(property1: number) and constructor(property1: number, property2: string). When you create an instance of the class, the constructor with the matching parameter list is called:

```typescript
let myInstance1 = new MyClass(10);
let myInstance2 = new MyClass(10, "Hello");
```

Learn more from the following resources:

- [Constructors - TypeScript](https://www.typescriptlang.org/docs/handbook/2/classes.html#constructors)
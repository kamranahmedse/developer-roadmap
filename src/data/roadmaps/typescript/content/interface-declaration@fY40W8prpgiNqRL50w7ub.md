# Interface Declaration

An `interface` in TypeScript is a blueprint for creating objects with specific structure. An `interface` defines a set of properties, methods, and events that a class or object must implement. The interface is a contract between objects and classes and can be used to enforce a specific structure for objects in your code.

Here is an example of an interface declaration in TypeScript:

```typescript
interface Person {
  firstName: string;
  lastName: string;
  age?: number;

  getFullName(): string;
}
```

In this example, the Person interface defines four properties: `firstName`, `lastName`, `age`, and a method `getFullName()`. The age property is optional, indicated by the `?` symbol. Any class or object that implements the `Person` interface must have these properties and method.

Learn more from the following links:

- [@article@Extending Interfaces](https://www.typescriptlang.org/docs/handbook/2/objects.html)

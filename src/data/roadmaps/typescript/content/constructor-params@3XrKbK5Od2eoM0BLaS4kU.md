# Constructor Params

In TypeScript, constructor parameters can be declared with access modifiers (e.g. `public`, `private`, `protected`) and/or type annotations. The parameters are then automatically assigned to properties of the same name within the constructor, and can be accessed within the class. For example:

```typescript
class Example {
  constructor(private name: string, public age: number) {}
}
```

In this example, the constructor has two parameters: name and age. name has a private access modifier, so it can only be accessed within the Example class. age has a public access modifier, so it can be accessed from outside the class as well.

Learn more from the following links:

- [@official@TypeScript - Construct](https://www.typescriptlang.org/docs/handbook/2/classes.html#constructors)

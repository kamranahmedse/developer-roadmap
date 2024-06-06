# As Type


In TypeScript, the as keyword is used for type assertions, allowing you to explicitly inform the compiler about the type of a value when it cannot be inferred automatically. Type assertions are a way to override the default static type-checking behavior and tell the compiler that you know more about the type of a particular expression than it does.

Here's a simple example:

```typescript
let someValue: any = "Hello, TypeScript!";
let strLength: number = (someValue as string).length;

console.log(strLength); // Outputs: 18
```
In this example, someValue is initially of type any, and we use the as operator to assert that it is of type string before accessing its length property.

It's important to note that type assertions do not change the runtime type of a value, and do not cause any type of conversion. They are a compile-time construct used for static type checking in TypeScript.

- [@article@Type assertions](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-assertions)

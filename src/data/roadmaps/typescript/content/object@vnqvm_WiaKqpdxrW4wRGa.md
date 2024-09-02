# Object

To define an `object` type, we simply list its properties and their types.

For example, here’s a function that takes a point-like object:

```typescript
// The parameter's type annotation is an object type
function printCoord(pt: { x: number; y: number }) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}

printCoord({ x: 3, y: 7 });
```

Learn more from the following links:

- [@official@Object Types in TypeScript](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#object-types)

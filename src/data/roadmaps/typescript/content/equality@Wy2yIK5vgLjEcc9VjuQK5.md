# Equality

TypeScript also uses switch statements and equality checks like `===`, `!==`, `==`, and `!=` to narrow types. For example:

```typescript
function example(x: string | number, y: string | boolean) {
  if (x === y) {
    // We can now call any 'string' method on 'x' or 'y'.
    x.toUpperCase();
    y.toLowerCase();
  } else {
    console.log(x);
    console.log(y);
  }
}
```

When we checked that `x` and `y` are both equal in the above example, TypeScript knew their types also had to be equal. Since string is the only common type that both `x` and `y` could take on, TypeScript knows that `x` and `y` must be a string in the first branch.

Learn more from the following links:

- [@official@Equality Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#equality-narrowing)

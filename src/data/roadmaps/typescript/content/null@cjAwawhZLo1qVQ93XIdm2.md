# null

JavaScript has two primitive values used to signal absent or uninitialized value: `null` (absent) and `undefined` (unintialized).

TypeScript has two corresponding _types_ by the same names. How these types behave depends on whether you have the `strictNullChecks` option on.

With `strictNullChecks` off, values that might be `null` or `undefined` can still be accessed normally, and the values `null` and `undefined` can be assigned to a property of any type. This is similar to how languages without `null` checks (e.g. C#, Java) behave. The lack of checking for these values tends to be a major source of bugs; TypeScript always recommend people turn `strictNullChecks` on if it’s practical to do so in the codebase.

With `strictNullChecks` on, when a value is `null` or `undefined`, you will need to test for those values before using methods or properties on that value. Just like checking for `undefined` before using an optional property, we can use narrowing to check for values that might be `null`:

```typescript
function doSomething(x: string | null) {
  if (x === null) {
    // do nothing
  } else {
    console.log('Hello, ' + x.toUpperCase());
  }
}
```

Learn more from the following links:

- [@article@null and undefined](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#null-and-undefined)

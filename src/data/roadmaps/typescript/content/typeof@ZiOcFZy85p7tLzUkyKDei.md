# typeof Operator

The `typeof` operator is used to check the type of a variable. It returns a string value representing the type of the variable.

```typescript
let value: string | number = 'hello';

if (typeof value === 'string') {
  console.log('value is a string');
} else {
  console.log('value is a number');
}
```

Learn more from the following links:

- [@article@Type Guards and Differentiating Types](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#typeof-type-guards)

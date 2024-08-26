# Type Aliases

A Type Alias in TypeScript allows you to create a new name for a type.

Here's an example:

```typescript
type Name = string;
type Age = number;
type User = { name: Name; age: Age };

const user: User = { name: 'John', age: 30 };
```

In the example above, `Name` and `Age` are type aliases for `string` and `number` respectively. And `User` is a type alias for an object with properties `name` of type `Name` and `age` of type `Age`.

Learn more from the following links:

- [@article@Type Aliases](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases)

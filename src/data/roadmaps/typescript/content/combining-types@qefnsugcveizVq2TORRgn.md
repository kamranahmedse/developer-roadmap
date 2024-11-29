# Combining Types

In TypeScript, you can combine types using type union and type intersection.

## Type Union

The union operator `|` is used to combine two or more types into a single type that represents all the possible types. For example:

```typescript
type stringOrNumber = string | number;
let value: stringOrNumber = 'hello';

value = 42;
```

## Type Intersection

The intersection operator `&` is used to intersect two or more types into a single type that represents the properties of all the types. For example:

```typescript
interface A {
  a: string;
}

interface B {
  b: number;
}

type AB = A & B;
let value: AB = { a: 'hello', b: 42 };
```

Learn more from the following links:

- [@official@Union Types in TypeScript](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types)
- [@article@Intersection Types in TypeScript](https://www.typescripttutorial.net/typescript-tutorial/typescript-intersection-types/)
- [@article@Type Aliases](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases)
- [@article@Keyof Type Operator](https://www.typescriptlang.org/docs/handbook/2/keyof-types.html#handbook-content)

# Conditional Types

Conditional types let your types make decisions. They work like an `if` statement but for types: "If type A is type B, then use type X, otherwise use type Y."

## Why Use Conditional Types?

Sometimes the type your function returns depends on what you pass in. For example:
- Pass in a `Promise<string>` → Get back `string`
- Pass in a `string` → Get back `string`
- Pass in an `array` → Get back the item type inside the array

Conditional types let you describe these patterns.

## How It Works

Conditional types follow this pattern:

```typescript
type Check<T> = T extends SomeType ? TypeIfTrue : TypeIfFalse;
```

Read it like: "If T extends SomeType, use TypeIfTrue, otherwise use TypeIfFalse."

## Examples

### Simple Example: Is It a String?

```typescript
type IsString<T> = T extends string ? "yes" : "no";

type A = IsString<"hello">; // "yes"
type B = IsString<42>; // "no"
```

### Practical Example: Extract Promise Type

```typescript
// When you have a Promise, extract what's inside
type GetPromiseType<T> = T extends Promise<infer U> ? U : T;

type A = GetPromiseType<Promise<string>>; // string
type B = GetPromiseType<string>; // string
```

The `infer` keyword means "figure out and remember this type."

### Real-World Example: Function Return Types

```typescript
// If T is a function, get its return type, otherwise return never
type GetReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

type A = GetReturnType<() => string>; // string
type B = GetReturnType<() => { id: number }>; // { id: number }
```

### Nested Conditions

```typescript
type TypeName<T> = T extends string
  ? "string"
  : T extends number
  ? "number"
  : T extends boolean
  ? "boolean"
  : "other";

type A = TypeName<"hello">; // "string"
type B = TypeName<42>; // "number"
```

## Common Patterns

- **Extract from Promise**: `T extends Promise<infer U> ? U : T`
- **Get return type**: `T extends (...args: any[]) => infer R ? R : never`
- **Get array item type**: `T extends (infer U)[] ? U : T`

## Tips to Remember

- **Use `infer` to capture types**: It lets you "remember" a type for later
- **Chain conditions**: You can nest conditional types for complex logic
- **Start simple**: Begin with basic conditions before using `infer`

Learn more from the following links:

- [@official@Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#handbook-content)
- [@video@Conditional Types - Advanced TypeScript](https://www.youtube.com/watch?v=QFWrbNehKk0)

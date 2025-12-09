# Generic Constraints

Limit what types a generic can accept using constraints.

## Why Constraints?

Sometimes a generic function needs specific features. For example, you might need to access `.length` on a value. Without constraints, TypeScript won't let you do that because not all types have a `.length` property. Constraints say "this generic only works with types that have these features."

## The `extends` Keyword

Use `extends` to tell TypeScript what properties a type must have:

```typescript
// Only accept types that have a 'length' property
function printLength<T extends { length: number }>(arg: T): void {
  console.log(arg.length);
}

printLength('hello');       // OK (strings have .length)
printLength([1, 2, 3]);     // OK (arrays have .length)
printLength(42);            // Error (numbers don't have .length)
```

## Using Interfaces as Constraints

```typescript
// Define what properties the type must have
interface HasName {
  name: string;
}

// Only accept types with a 'name' property
function printName<T extends HasName>(user: T): void {
  console.log(user.name);
}

printName({ name: 'Alice' });           // OK
printName({ name: 'Bob', age: 30 });    // OK
printName({ age: 30 });                 // Error (no 'name' property)
```

## Practical Example: Working with Object Keys

```typescript
// Only accept types that are objects
// K must be a key that exists in T
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const person = { name: 'Sarah', age: 25 };

getProperty(person, 'name');  // OK, returns string
getProperty(person, 'age');   // OK, returns number
getProperty(person, 'email'); // Error, 'email' is not a key in person
```

## Multiple Constraints

```typescript
// Type must be both a string AND have specific length
function processString<T extends string & { length: number }>(s: T): T {
  // This is uncommon, but shows you can combine constraints
  return s;
}

// Simpler: just constrain to string
function processString<T extends string>(s: T): T {
  return s.toUpperCase() as T;
}
```

## Common Patterns

| Constraint | Means |
|-----------|-------|
| `<T extends string>` | Only accept strings |
| `<T extends number>` | Only accept numbers |
| `<T extends { x: number }>` | Only accept objects with an `x` number property |
| `<T extends keyof U>` | Only accept keys that exist in type U |
| `<T extends Array<any>>` | Only accept arrays |

## Tips

- Constraints keep your generics safe — they prevent bugs
- Use `extends` to make your generic requirements clear
- When you can't figure out why TypeScript is complaining, you probably need a constraint

Learn more from the following resources:

- [@official@Generic Constraints - TypeScript](https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-constraints)

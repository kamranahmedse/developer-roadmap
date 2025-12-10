# Ambient Modules

Ambient modules let you tell TypeScript about libraries that don't have type information (usually JavaScript libraries).

## Why Do You Need This?

Sometimes you want to use a JavaScript library, but it doesn't have TypeScript types. TypeScript gets confused and shows errors:

```typescript
// npm install some-old-library
import someLib from 'some-old-library';
// Error: TypeScript doesn't know what this is!
```

Ambient modules solve this by creating type information for libraries that don't have it.

## How It Works

Create a `.d.ts` file (declaration file) with `declare module`:

```typescript
// typings/my-library.d.ts
declare module 'my-library' {
  export function doSomething(): void;
  export function calculate(a: number, b: number): number;
}

// main.ts
import * as myLib from 'my-library';

myLib.doSomething();        // ✓ TypeScript knows this exists
myLib.calculate(5, 3);      // ✓ TypeScript knows the types
// myLib.unknownFunction();  // ✗ Error: doesn't exist
```

## Real-World Example

Let's say you have an old library called `google-analytics` with no types:

```typescript
// typings/google-analytics.d.ts
declare module 'google-analytics' {
  export function trackEvent(category: string, action: string): void;
  export function setUserId(id: string): void;
}

// analytics.ts
import * as ga from 'google-analytics';

export function trackUserClick(userId: string) {
  ga.setUserId(userId);
  ga.trackEvent('user', 'clicked_button');
}
```

## Common Patterns

**Declaring a simple function**:
```typescript
declare module 'simple-lib' {
  export function greet(name: string): string;
}
```

**Declaring multiple exports**:
```typescript
declare module 'utils-lib' {
  export function add(a: number, b: number): number;
  export function subtract(a: number, b: number): number;
  export const version: string;
}
```

**Declaring a class**:
```typescript
declare module 'database-lib' {
  export class Database {
    connect(url: string): void;
    query(sql: string): unknown[];
  }
}
```

## Modern Alternative

Before creating ambient modules, check if types are available:
- Search [DefinitelyTyped](https://definitelytyped.org/) for `@types/library-name`
- Install it: `npm install --save-dev @types/library-name`

Only create ambient modules when types truly don't exist.

Learn more from the following links:

- [@official@Ambient Modules](https://www.typescriptlang.org/docs/handbook/modules/reference.html#ambient-modules)

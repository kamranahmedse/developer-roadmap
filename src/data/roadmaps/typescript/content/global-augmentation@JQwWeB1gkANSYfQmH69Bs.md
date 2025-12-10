# Global Augmentation

Global augmentation lets you add new functionality to the global scope that any file can access.

## Why Do You Need This?

Sometimes you want a function or type available everywhere without importing it:

```typescript
// Without global augmentation - need to import everywhere
import { utils } from './utils';
utils.log('message');

// With global augmentation - available everywhere
log('message');  // Works in any file!
```

## How It Works

Create a declaration file that extends the global scope:

```typescript
// globals.d.ts
declare function log(message: string): void;
declare function error(message: string): void;

// Then in any file, these are available
log('Hello World');
error('Something went wrong');
```

## Adding to Existing Global Types

You can extend built-in types like the `Window` object in browsers:

```typescript
// types/window.d.ts
declare global {
  interface Window {
    appVersion: string;
    analytics: {
      track(event: string): void;
    };
  }
}

// main.ts
console.log(window.appVersion);           // ✓ TypeScript knows this
window.analytics.track('button_click');   // ✓ TypeScript knows this
```

## Real-World Example

Adding a custom function to Node.js:

```typescript
// types/global.d.ts
declare global {
  function logWithLevel(level: string, message: string): void;
  const API_URL: string;
}

// server.ts (any file can use these)
logWithLevel('INFO', 'Server starting');
console.log(`Connecting to ${API_URL}`);
```

Extending the `Window` object in a browser app:

```typescript
// types/window.d.ts
declare global {
  interface Window {
    myApp: {
      version: string;
      ready: boolean;
      init(): void;
    };
  }
}

// script.ts
if (window.myApp.ready) {
  window.myApp.init();
}
```

## Common Patterns

**Adding a global function**:
```typescript
declare global {
  function delay(ms: number): Promise<void>;
}
```

**Adding a global constant**:
```typescript
declare global {
  const DATABASE_URL: string;
  const MAX_RETRIES: number;
}
```

**Adding a global type/interface**:
```typescript
declare global {
  interface User {
    id: number;
    name: string;
  }
}
```

## Important Notes

- **Use sparingly**: Global code makes it harder to understand dependencies
- **Files need to be included**: Put these in `.d.ts` files in your project, or ensure they're imported by TypeScript
- **Prefer modules**: When possible, use imports instead of globals
- **Name carefully**: Avoid conflicts with existing global names

## Best Practice Alternative

For most cases, use regular modules instead:

```typescript
// utils.ts
export function log(message: string) { }
export const API_URL = 'https://api.example.com';

// main.ts
import { log, API_URL } from './utils';
log('Hello');
```

This is clearer because you see exactly where each function comes from.

Learn more from the following links:

- [@official@Global augmentation](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#global-augmentation)

# Namespace Augmentation

Namespace augmentation lets you add new code to an existing namespace without modifying the original.

## Why Do You Need This?

Imagine you're using a library with a namespace. You want to add a new function to it, but you don't want to edit the original code. Namespace augmentation lets you extend it:

```typescript
// Original library (you can't change this)
namespace UserLib {
  export function getUser(id: number) { /* ... */ }
}

// Your new code (in a different file)
namespace UserLib {  // Same name = augment it!
  export function deleteUser(id: number) { /* ... */ }
}

// Now UserLib has both functions
UserLib.getUser(1);
UserLib.deleteUser(1);
```

## How It Works

Declare a namespace with the same name in multiple files. TypeScript merges them together:

```typescript
// userService.d.ts
declare namespace UserService {
  export function getUserName(id: number): string;
}

// userServiceExtensions.ts
// Add new features to UserService
namespace UserService {
  export function formatUserName(name: string): string {
    return name.toUpperCase();
  }
}

// main.ts
const name = UserService.getUserName(1);           // ✓ Original function
const formatted = UserService.formatUserName(name); // ✓ New function
```

## Real-World Example

Let's say you have a logging library and want to add custom methods:

```typescript
// logger.d.ts (original library)
declare namespace Logger {
  export function log(message: string): void;
  export function error(message: string): void;
}

// loggerEnhancements.ts (your additions)
namespace Logger {
  export function logWithTimestamp(message: string): void {
    const time = new Date().toISOString();
    console.log(`[${time}] ${message}`);
  }
  
  export function logJson(data: unknown): void {
    console.log(JSON.stringify(data, null, 2));
  }
}

// main.ts
Logger.log('Simple message');                    // Original
Logger.logWithTimestamp('Message with time');    // New feature
Logger.logJson({ user: 'John' });                // New feature
```

## When to Use It

✓ Adding features to third-party namespaces  
✓ Extending library functionality without changing source code  
✓ Organizing related functions across multiple files

## Important Note

**Namespace augmentation is rarely needed in modern TypeScript.** Consider using:
- Regular modules (import/export) instead
- Global augmentation if you need to extend global types
- Module augmentation if extending other modules

Learn more from the following links:

- [@official@Module Augmentation](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation)

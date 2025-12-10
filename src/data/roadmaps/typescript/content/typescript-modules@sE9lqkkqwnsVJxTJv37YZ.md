# Modules

Modules help you organize and reuse code by breaking it into smaller, manageable pieces.

## Why Use Modules?

As your project grows, keeping all code in one file becomes messy. Modules let you:
- Split code into separate files
- Reuse code in multiple places
- Prevent naming conflicts (different files can have similar names)
- Make collaboration easier (each developer can work on separate modules)

## Two Types of Modules

### Internal Modules (Namespaces)

These organize code **within a single file**. They use the `namespace` keyword.

```typescript
// myModule.ts
namespace UserManagement {
  export function createUser(name: string) {
    console.log(`Creating user: ${name}`);
  }
  
  export function deleteUser(id: number) {
    console.log(`Deleting user ${id}`);
  }
}

// Using it in the same file
UserManagement.createUser('Alice'); // Output: "Creating user: Alice"
```

### External Modules (ES Modules / CommonJS)

These organize code **across multiple files**. They use `export` and `import` keywords.

```typescript
// userService.ts
export function createUser(name: string) {
  console.log(`Creating user: ${name}`);
}

export function deleteUser(id: number) {
  console.log(`Deleting user ${id}`);
}

// main.ts
import { createUser, deleteUser } from './userService';

createUser('Bob');     // Output: "Creating user: Bob"
deleteUser(1);        // Output: "Deleting user 1"
```

## When to Use Each

- **Namespaces**: Rare in modern TypeScript. Use when organizing code within a single file (older projects)
- **External Modules**: Recommended for modern projects. Use for organizing code across multiple files

## Common Patterns

**Exporting a single thing from a file**:
```typescript
// logger.ts
export default function log(message: string) {
  console.log(`[LOG] ${message}`);
}

// main.ts
import log from './logger';
log('Application started');
```

**Exporting multiple things**:
```typescript
// utils.ts
export const add = (a: number, b: number) => a + b;
export const subtract = (a: number, b: number) => a - b;

// main.ts
import { add, subtract } from './utils';
console.log(add(5, 3));      // 8
console.log(subtract(5, 3));  // 2
```

## Tips

- **Use descriptive filenames**: Name your files based on what they export
- **One main export per file**: Makes imports clearer
- **Group related functions**: Keep related code in the same module

Learn more from the following links:

- [@official@Modules](https://www.typescriptlang.org/docs/handbook/modules.html#handbook-content)
- [@video@TypeScript - Modules](https://www.youtube.com/watch?v=EpOPR03z4Vw)

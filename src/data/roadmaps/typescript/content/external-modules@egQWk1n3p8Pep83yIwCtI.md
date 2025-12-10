# External Modules

External modules let you split code into separate files and import what you need from each file.

## Why Use External Modules?

Breaking code into separate files makes projects:
- Easier to navigate and understand
- Simpler to maintain and update
- Possible to work on simultaneously with teammates
- Reusable across different projects

## The Basics

### Export: Make code available to other files

```typescript
// userService.ts
export function createUser(name: string) {
  console.log(`Creating user: ${name}`);
}

export function getUser(id: number) {
  return { id, name: 'John Doe' };
}
```

### Import: Use code from other files

```typescript
// main.ts
import { createUser, getUser } from './userService';

createUser('Alice');  // Output: "Creating user: Alice"
const user = getUser(1);
console.log(user);
```

## Different Export Styles

### Named Exports (multiple things from one file)

```typescript
// math.ts
export const add = (a: number, b: number) => a + b;
export const subtract = (a: number, b: number) => a - b;
export const multiply = (a: number, b: number) => a * b;

// main.ts
import { add, subtract } from './math';
console.log(add(5, 3));  // 8
```

### Default Export (one main thing from a file)

```typescript
// logger.ts
export default function log(message: string) {
  console.log(`[LOG] ${message}`);
}

// main.ts
import log from './logger';  // No curly braces!
log('Hello World');
```

### Mix Named and Default

```typescript
// utils.ts
export default function main() { }
export function helper() { }

// main.ts
import main, { helper } from './utils';
```

## Practical Example

```typescript
// api.ts
export async function fetchUsers() {
  const response = await fetch('/api/users');
  return response.json();
}

export async function fetchUser(id: number) {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
}

// dashboard.ts
import { fetchUsers } from './api';

async function loadDashboard() {
  const users = await fetchUsers();
  console.log(users);
}

loadDashboard();
```

## Best Practices

- **Use named exports for utilities**: Helps with clarity
- **Use default export for main class/function**: Simplifies imports
- **Keep exports organized**: One concern per file when possible
- **Use relative paths**: `'./utils'` instead of absolute paths

Learn more from the following links:

- [@article@TypeScript - External Module](https://learncodeweb.com/typescript/modules-in-typescript-explain-with-an-example/)

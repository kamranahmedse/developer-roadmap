# Namespaces

A namespace is a way to group related code together and avoid naming conflicts by creating a named container.

## Why Use Namespaces?

Imagine you have a `User` class and your team member also has a `User` class—they would conflict. Namespaces solve this by putting code inside labeled containers:

```typescript
// Without namespace - naming conflict!
class User { }
class Admin { }

// With namespace - no conflicts
namespace UserManagement {
  export class User { }
  export class Admin { }
}

namespace Blog {
  export class User { }  // Different from UserManagement.User
}
```

## How It Works

Use the `namespace` keyword to create a container. Put `export` before anything you want to use outside the namespace.

```typescript
// math.ts
namespace MathUtils {
  export function add(a: number, b: number): number {
    return a + b;
  }
  
  export function multiply(a: number, b: number): number {
    return a * b;
  }
  
  // Private function - only used inside the namespace
  function log(result: number) {
    console.log(`Result: ${result}`);
  }
}

// main.ts
/// <reference path="math.ts" />

console.log(MathUtils.add(2, 3));       // 5
console.log(MathUtils.multiply(2, 3));  // 6
// MathUtils.log(5);  // Error: 'log' is private to the namespace
```

## Real-World Example

```typescript
namespace UserService {
  export interface User {
    id: number;
    name: string;
    email: string;
  }
  
  export function getUser(id: number): User {
    return { id, name: 'John', email: 'john@example.com' };
  }
  
  export function updateUser(id: number, user: User): void {
    console.log(`Updated user ${id}`);
  }
}

// Using it
const user = UserService.getUser(1);
UserService.updateUser(1, user);
```

## Important Note

**Namespaces are considered outdated in modern TypeScript.** For new projects, use ES modules (import/export) instead. Namespaces are mainly used in:
- Older projects
- Global type declarations (using `declare namespace`)

Prefer this instead:
```typescript
// userService.ts (modern approach)
export interface User {
  id: number;
  name: string;
  email: string;
}

export function getUser(id: number): User {
  return { id, name: 'John', email: 'john@example.com' };
}

// main.ts
import { getUser } from './userService';
```

Learn more from the following resources:

- [@official@Overview of Namespaces](https://www.typescriptlang.org/docs/handbook/namespaces.html)
- [@official@Namespaces and Modules](https://www.typescriptlang.org/docs/handbook/namespaces-and-modules.html)
- [@official@TypeScript - Using Namespaces](https://typescriptlang.org/docs/handbook/namespaces-and-modules.html#using-namespaces)

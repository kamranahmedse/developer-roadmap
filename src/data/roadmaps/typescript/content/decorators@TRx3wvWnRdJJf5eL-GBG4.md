# Decorators

Wrap a `@decorator` around a class, method, or property to automatically add new behavior without changing the original code.

## Why Use Decorators?

Decorators let you add extra functionality to classes and methods in a clean, reusable way. Instead of copy-pasting the same code everywhere, you write it once and attach it with `@decorator`.

**Common uses:**
- Logging what methods are being called
- Checking if a user has permission before running a method
- Measuring how long a method takes to run
- Validating data before it's used

## How Decorators Work

A decorator is just a function that takes something (like a method) and wraps it with extra behavior. Think of it like putting a protective case around your phone — the phone still works the same way, but now it's protected.

## Examples

### Basic Example: Logging Method Calls

```typescript
// Create a decorator that logs when a method is called
function log(
  target: Object,                          // The class
  propertyKey: string | symbol,            // The method name
  descriptor: PropertyDescriptor           // The method itself
) {
  const originalMethod = descriptor.value;  // Save the original method

  // Replace it with a new version that logs first
  descriptor.value = function (...args: any[]) {
    console.log(`Calling ${propertyKey} with: ${args}`);
    return originalMethod.apply(this, args); // Call the original
  };

  return descriptor;
}

// Use the decorator
class Calculator {
  @log
  add(a: number, b: number): number {
    return a + b;
  }
}

const calc = new Calculator();
calc.add(5, 3);
// Output: Calling add with: 5,3
// Output: 8
```

### Practical Example: Permission Checking

```typescript
// Decorator to check if user has permission
function requiresAdmin(
  target: Object,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;

  descriptor.value = function (user: any, ...args: any[]) {
    if (!user.isAdmin) {
      throw new Error("You don't have permission to do this");
    }
    return originalMethod.apply(this, args);
  };

  return descriptor;
}

class UserManager {
  @requiresAdmin
  deleteUser(user: any, userId: string): void {
    console.log(`Deleted user: ${userId}`);
  }
}

const manager = new UserManager();
manager.deleteUser({ isAdmin: true }, "user-123");
// Works fine

manager.deleteUser({ isAdmin: false }, "user-456");
// Error: You don't have permission to do this
```

### Another Practical Example: Measuring Performance

```typescript
// Decorator to measure how long a method takes
function measureTime(
  target: Object,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    const startTime = Date.now();
    const result = originalMethod.apply(this, args);
    const endTime = Date.now();
    
    console.log(`${propertyKey} took ${endTime - startTime}ms`);
    return result;
  };

  return descriptor;
}

class DataProcessor {
  @measureTime
  processLargeDataset(data: any[]): number {
    // Simulate processing
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
      sum += data[i];
    }
    return sum;
  }
}

const processor = new DataProcessor();
processor.processLargeDataset([1, 2, 3, 4, 5]);
// Output: processLargeDataset took 0ms
```

## Tips and Best Practices

- **Keep decorators simple**: Each decorator should do one thing well
- **Use meaningful names**: `@log`, `@requiresAdmin`, `@cache` are clear names
- **Combine decorators**: You can stack multiple decorators on one method:
  ```typescript
  class UserManager {
    @log
    @requiresAdmin
    deleteUser(user: any, userId: string): void {
      // ...
    }
  }
  ```
- **Enable decorators**: You need to add `"experimentalDecorators": true` to your `tsconfig.json`

## Common Mistakes to Avoid

- **Don't forget to return the descriptor**: Always return the modified descriptor at the end
- **Be careful with `this`**: Use regular functions (not arrow functions) so `this` refers to the instance
- **Don't overcomplicate**: If a decorator gets too complex, consider using a helper function instead

Learn more from the following links:

- [@official@Decorators](https://www.typescriptlang.org/docs/handbook/decorators.html#handbook-content)

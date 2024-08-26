# Decorators

Decorators are a feature of TypeScript that allow you to modify the behavior of a class, property, method, or parameter. They are a way to add additional functionality to existing code, and they can be used for a wide range of tasks, including logging, performance optimization, and validation.

Here's an example of how you might use a decorator in TypeScript:

```typescript
function log(
  target: Object,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    console.log(`Calling ${propertyKey} with arguments: ${args}`);
    return originalMethod.apply(this, args);
  };

  return descriptor;
}

class Calculator {
  @log
  add(a: number, b: number): number {
    return a + b;
  }
}

const calculator = new Calculator();
calculator.add(1, 2);
// Output: Calling add with arguments: 1,2
// Output: 3
```

In this example, we use the `@log` decorator to modify the behavior of the `add` method in the `Calculator` class. The `log` decorator logs the arguments passed to the method before calling the original method. This allows us to see what arguments are being passed to the method, without having to modify the method's code.

Learn more from the following links:

- [@article@Decorators](https://www.typescriptlang.org/docs/handbook/decorators.html#handbook-content)

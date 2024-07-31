# Modules

In TypeScript, modules are used to organize and reuse code. There are two types of modules in TypeScript:

- Internal
- External

Internal modules are used to organize code within a file and are also referred to as namespaces. They are defined using the "namespace" keyword.

External modules are used to organize code across multiple files. They are defined using the "export" keyword in one file and the "import" keyword in another file. External modules in TypeScript follow the CommonJS or ES modules standards.

Here is an example of how you can use internal modules in TypeScript:

```typescript
// myModule.ts
namespace MyModule {
  export function doSomething() {
    console.log('Doing something...');
  }
}

// main.ts
/// <reference path="myModule.ts" />
MyModule.doSomething(); // Output: "Doing something..."
```

Learn more from the following links:

- [@article@Modules](https://www.typescriptlang.org/docs/handbook/modules.html#handbook-content)
- [@video@TypeScript - Modules](https://www.youtube.com/watch?v=EpOPR03z4Vw)

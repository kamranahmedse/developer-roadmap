# External Modules

In TypeScript, external modules allow you to organize and share code across multiple files. External modules in TypeScript follow the CommonJS or ES modules standards.

Here's an example of how you can use external modules in TypeScript:

```typescript
// myModule.ts
export function doSomething() {
  console.log('Doing something...');
}

// main.ts
import { doSomething } from './myModule';
doSomething(); // Output: "Doing something..."
```

In this example, we use the "export" keyword in the "myModule.ts" file to export the "doSomething" function, making it available for other files to use.

Learn more from the following links:

- [@official@External Module](https://www.javatpoint.com/typescript-module)
- [@article@TypeScript - External Module](https://learncodeweb.com/typescript/modules-in-typescript-explain-with-an-example/)

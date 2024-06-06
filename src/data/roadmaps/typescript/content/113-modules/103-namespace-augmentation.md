# Namespace Augmentation

In TypeScript, namespace augmentation is a way to extend or modify existing namespaces. This is useful when you want to add new functionality to existing namespaces or to fix missing or incorrect declarations in third-party libraries.

Here's an example of how you can use namespace augmentation in TypeScript:

```typescript
// myModule.d.ts
declare namespace MyModule {
  export interface MyModule {
    newFunction(): void;
  }
}

// main.ts
/// <reference path="myModule.d.ts" />
namespace MyModule {
  export class MyModule {
    public newFunction() {
      console.log('I am a new function in MyModule!');
    }
  }
}

const obj = new MyModule.MyModule();
obj.newFunction(); // Output: "I am a new function in MyModule!"
```

In this example, we use namespace augmentation to add a new function "newFunction" to the "MyModule" namespace. This is done in the declaration file `myModule.d.ts` by declaring a new interface "MyModule" within the "MyModule" namespace and adding the "newFunction" function to it.

Learn more from the following links:

- [@article@Module Augmentation](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation)

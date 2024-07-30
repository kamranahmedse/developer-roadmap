# Global Augmentation

In TypeScript, global augmentation is a way to add declarations to the global scope. This is useful when you want to add new functionality to existing libraries or to augment the built-in types in TypeScript.

Here's an example of how you can use global augmentation in TypeScript:

```typescript
// myModule.d.ts
declare namespace NodeJS {
  interface Global {
    myGlobalFunction(): void;
  }
}

// main.ts
global.myGlobalFunction = function () {
  console.log('I am a global function!');
};

myGlobalFunction(); // Output: "I am a global function!"
```

In this example, we declare a new namespace "NodeJS" and add an interface "Global" to it. Within the "Global" interface, we declare a new function "myGlobalFunction".

Learn more from the following links:

- [@article@Global augmentation](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#global-augmentation)

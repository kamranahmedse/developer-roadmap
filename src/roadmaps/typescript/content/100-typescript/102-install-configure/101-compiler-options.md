# Compiler Options

Compiler options in TypeScript are a set of configuration settings that control how the TypeScript compiler compiles your code. Here are some commonly used compiler options with examples:

1. target
2. module
3. strict
4. outDir
5. rootDir
6. exclude

Have a look at the following example tsconfig.json:

```
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "strict": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "exclude": ["node_modules"]
  }
}
```

Learn more from the following links:

- [Compiler Options](https://www.typescriptlang.org/docs/handbook/compiler-options.html#compiler-options)
- [TypeScript Compiler Options](https://www.youtube.com/watch?v=I1ZFsPK0Q-Y&vl=en)
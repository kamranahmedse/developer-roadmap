# tsconfig.json

tsconfig.json is a configuration file in TypeScript that specifies the compiler options for building your project. It helps the TypeScript compiler understand the structure of your project and how it should be compiled to JavaScript. Some common options include:

- `target`: the version of JavaScript to compile to.
- `module`: the module system to use.
- `strict`: enables/disables strict type checking.
- `outDir`: the directory to output the compiled JavaScript files.
- `rootDir`: the root directory of the TypeScript files.
- `include`: an array of file/directory patterns to include in the compilation.
- `exclude`: an array of file/directory patterns to exclude from the compilation.

Given below is the sample `tsconfig.json` file:

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "strict": true,
    "outDir": "./dist",
    "rootDir": "./src",
  },
  "exclude": ["node_modules"],
  "include": ["src"]
}
```

Learn more from the following links:

- [@official@What is a tsconfig.json](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html#handbook-content)

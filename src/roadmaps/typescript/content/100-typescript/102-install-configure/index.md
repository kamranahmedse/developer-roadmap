# Install Configure

To install and configure TypeScript in your project, you need to perform the following steps:

- Install TypeScript globally on your machine using npm (Node Package Manager):

    ```
    npm install -g typescript
    ```

- Initialize npm in your project directory by running the following command:

    ```
    npm init
    ```

- Install TypeScript as a project dependency by running the following command:

    ```
    npm install --save-dev typescript
    ```

- Create a tsconfig.json file in your project directory to specify the compiler options for building your project. For example:

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

- Compile your TypeScript code using the following command:
    
    ```
    tsc
    ```

Note: You can also compile individual TypeScript files by specifying the file name after the tsc command.For example:

    ```
    tsc index.ts
    ```

And you're all set! You can now start writing TypeScript code in your project.


Learn more from the following links:

- [How To Configure TypeScript](https://www.youtube.com/watch?v=SEnAS_ooHeA)
- [Installing TypeScript](https://www.typescriptlang.org/download)
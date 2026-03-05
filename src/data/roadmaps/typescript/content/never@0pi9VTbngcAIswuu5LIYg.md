# Never Type

The `never` type in TypeScript represents the type of values that will never occur. This means a function that always throws an error or runs forever (infinite loop) implicitly returns `never`. It is also useful for exhaustive checking in discriminated unions, ensuring that all possible cases are handled. Essentially, you cannot assign any type to a variable of type `never` (except `never` itself), making it the bottom type in TypeScript's type system.

Visit the following resources to learn more:

- [@official@Never Type](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#the-never-type)
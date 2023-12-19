# Type Guard

A type guard is a TypeScript technique used to get information about the type of a variable, usually within a conditional block. Type guards are regular functions that return a boolean, taking a type and telling TypeScript if it can be narrowed down to something more specific. Type guards have the unique property of assuring that the value tested is of a set type depending on the returned boolean.

TypeScript uses built-in JavaScript operators like `typeof`, `instanceof`, and the `in` operator, which is used to determine if an object contains a property. Type guards enable you to instruct the TypeScript compiler to infer a specific type for a variable in a particular context, ensuring that the type of an argument is what you say it is.

Type guards are typically used for narrowing a type and are pretty similar to feature detection, allowing you to detect the correct methods, prototypes, and properties of a value. Therefore, you can quickly figure out how to handle that value.

Visit the following resources to learn more:

- [Types Guards - Blog](https://blog.logrocket.com/how-to-use-type-guards-typescript/)
- [TypeScript Type Guards Explained](https://www.youtube.com/watch?v=FEeEItMtDwg)
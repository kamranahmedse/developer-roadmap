# Truthiness

Truthiness in TypeScript, as in JavaScript, refers to the concept of a value evaluating to `true` when encountered in a Boolean context.  Certain values are inherently "truthy" while others are "falsy."  TypeScript uses this understanding to refine the type of a variable based on the outcome of a truthiness check, effectively narrowing its potential types to those that are compatible with a `true` outcome. This allows for more precise type checking within conditional blocks.

Visit the following resources to learn more:

- [@official@Truthiness Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#truthiness-narrowing)
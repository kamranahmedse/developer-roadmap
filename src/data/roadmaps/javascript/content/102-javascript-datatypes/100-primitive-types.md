# Primitive Types

In JavaScript, a primitive (primitive value, primitive data type) is data that is not an object and has no methods or properties. A significant difference between primitive data types and non-primitives is that primitive types can only contain one value, and that value must be of the same primitive type. In contrast, non-primitives can accommodate a variable number of values, and these values can be of different primitive types. This flexibility is evident in data structures like arrays and objects.

In the context of primitives, it's important to note that they do not possess methods or properties. However, JavaScript enables access to methods and properties associated with primitive types such as string, number, and boolean. this functionality is due to JavaScript's ability to implicitly convert primitives to objects with wrapper objects when necessary. When properties are accessed on primitives, JavaScript auto-boxes the value into a wrapper object and accesses the property on that object instead.

There are 7 primitive data types:

- `string`
- `number`
- `bigint`
- `boolean`
- `undefined`
- `Symbol`
- `null`

Most of the time, a primitive value is represented directly at the lowest level of the language implementation.

Visit the following resources to learn more:

- [Primitive](https://developer.mozilla.org/en-US/docs/Glossary/Primitive)

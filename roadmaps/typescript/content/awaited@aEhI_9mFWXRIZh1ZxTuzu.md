# Awaited

Awaited is a utility type that models the process of unwrapping a Promise. It is used to determine the type that a Promise resolves to, regardless of how many layers of nested Promises are involved. By applying this utility, you can extract the underlying value from an asynchronous function's return type or any other Promise-like structure.
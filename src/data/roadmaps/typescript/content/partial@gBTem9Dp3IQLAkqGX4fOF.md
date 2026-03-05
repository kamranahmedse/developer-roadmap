# Partial Type

The `Partial<Type>` utility type in TypeScript constructs a type where all properties of the original `Type` are set to optional. This means that when you use `Partial<Type>`, you can create objects that only include a subset of the properties defined in the original `Type`, or even have no properties at all. Essentially, it makes all properties of a type nullable.
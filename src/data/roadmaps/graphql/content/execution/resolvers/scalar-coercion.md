# Scalar Coercion

In GraphQL, scalar coercion is the process of converting a value from one type to another, as it flows through the resolvers. This is needed when the input value for a field does not match the expected type, but can still be successfully converted to the correct type.

Scalar coercion can be implemented in the resolvers by using the **GraphQLScalarType** constructor to define a custom scalar type and providing a **coerce** function that can convert the input value to the correct type.

Learn more from the following links:

- [@official@Get started with Scalar coercion](https://graphql.org/learn/execution/#scalar-coercion)

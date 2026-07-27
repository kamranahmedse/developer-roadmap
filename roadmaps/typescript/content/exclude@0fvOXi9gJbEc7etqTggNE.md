# Exclude

`Exclude` is a utility type in TypeScript that constructs a new type by removing types from a union type. Given two types, `Type` and `ExcludedUnion`, `Exclude<Type, ExcludedUnion>` creates a type that includes all members of `Type` that are *not* assignable to `ExcludedUnion`. This is useful for filtering out specific types from a union, resulting in a more refined and specific type.

Visit the following resources to learn more:

- [@official@Exclude<UnionType, ExcludedMembers>](https://www.typescriptlang.org/docs/handbook/utility-types.html#excludeuniontype-excludedmembers)
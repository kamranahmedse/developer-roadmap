# satisfies Keyword

The `satisfies` operator lets us validate that the type of an expression matches some type, without changing the resulting type of that expression.

# Features of using `satisfies` keyword:

```typescript
// the basic Interface declaration
interface User {
    id: number;
    name: string;
    email: string;
}

const user1: User = {
    id: 1,
    name: "Alice",
    email: "alice@example.com"
};
// Here it is explicitly declared as `user` should be of `User` type only
// Typescript will check as if the declared object confirms to interface `User`

const user2 = {
     id: 2,
     name: "Bob",
     email: "bob2@noname.com",
     age: 30 // Extra property considered for user2
} satisfies User
// Here it is declared using `satisfies` keyword
// Typescript will also check as if the declared object complies to `User` but also allows to use additional property / keys for the object.
// There is no Type narrowing for declaring user2

```

Learn more from the following resources:

- [@official@satisfies Keyword](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html#the-satisfies-operator)

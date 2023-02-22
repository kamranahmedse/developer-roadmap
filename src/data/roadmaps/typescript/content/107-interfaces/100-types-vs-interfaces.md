# Types vs Interfaces
Types and interfaces in TypeScript are both used to define the shape of an object or a function. While they may seem similar at first glance, there are some important differences between the two.

1) Syntax: 
The syntax for defining a type is using the type keyword followed by a name and a type definition. For example:
```typescript
type Person = {
  firstName: string;
  lastName: string;
  age: number;
};
```
The syntax for defining an interface is using the interface keyword followed by a name and a type definition. For example:
```typescript
interface Person {
  firstName: string;
  lastName: string;
  age: number;
};
```
2) Extensibility:
Interfaces can be extended to create new interfaces that inherit the properties of the parent interface. Types cannot be extended in the same way.
```typescript
interface Person {
  firstName: string;
  lastName: string;
}

interface Employee extends Person {
  jobTitle: string;
}
```
3) Intersection types:
Intersection types allow you to combine multiple types or interfaces into a single type. This can be useful when you want to create a new type that has properties from multiple sources.
```typescript
type Person = {
  firstName: string;
  lastName: string;
};

type Employee = {
  jobTitle: string;
  salary: number;
};

type PersonEmployee = Person & Employee;
```
4) Callable:
Interfaces can be used to describe the shape of a function, including its parameters and return type. Types cannot be used in the same way.
```typescript
interface AddFunc {
  (a: number, b: number): number;
}

const add: AddFunc = (a, b) => a + b;
```
5) Aliasing:
Types can be used to create aliases for existing types. Interfaces cannot be used in the same way.
```typescript
type UserId = number;
type UserName = string;

function getUserById(id: UserId): UserName {
  // implementation
}
```

In summary, both types and interfaces can be used to define the shape of an object or a function. Interfaces are more flexible and can be extended and used to describe callable functions, while types can be used to create aliases for existing types and used in intersection types. The choice between types and interfaces depends on the specific use case and personal preference.

Learn more from the following links:

- [Interfaces vs. Type Aliases](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces)
- [Interfaces vs Types in TypeScript](https://stackoverflow.com/questions/37233735/interfaces-vs-types-in-typescript)

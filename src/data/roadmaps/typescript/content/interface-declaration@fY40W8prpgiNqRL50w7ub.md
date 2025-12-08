# Interface Declaration

Create an interface to define the exact shape and structure that an object must have.

## What Is an Interface Declaration?

When you declare an interface, you're creating a contract that says "any object of this type must have these properties and methods." It's like saying "if you want to be a Person, you must have a name and age."

## Basic Syntax

```typescript
interface InterfaceName {
  propertyName: type;
  methodName(): returnType;
}
```

## Simple Example

```typescript
interface Person {
  firstName: string;
  lastName: string;
  age: number;
}

const person: Person = {
  firstName: 'John',
  lastName: 'Doe',
  age: 30,
};
```

## Optional Properties

Use `?` to make a property optional:

```typescript
interface Person {
  firstName: string;
  lastName: string;
  age?: number;  // This property is optional
  nickname?: string;  // This one too
}

const person: Person = {
  firstName: 'John',
  lastName: 'Doe',
  // age is not required
};
```

## Adding Methods

Interfaces can include methods:

```typescript
interface Person {
  firstName: string;
  lastName: string;
  age?: number;

  // Method that returns a string
  getFullName(): string;
}

const person: Person = {
  firstName: 'John',
  lastName: 'Doe',
  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  },
};

console.log(person.getFullName()); // "John Doe"
```

## Practical Example: API Response

```typescript
interface ApiResponse {
  status: number;
  message: string;
  data?: any;  // Optional if there's no data
  
  getSuccess(): boolean;
}

const response: ApiResponse = {
  status: 200,
  message: 'Success',
  data: { id: 1, name: 'Item' },
  getSuccess() {
    return this.status === 200;
  },
};
```

## Key Points

- Use `?` to mark properties as optional
- Interfaces can include properties and methods
- Any object using an interface must have all required properties
- Interfaces are a TypeScript-only feature (removed when converted to JavaScript)

Learn more from the following links:

- [@official@Extending Interfaces](https://www.typescriptlang.org/docs/handbook/2/objects.html)

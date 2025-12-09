# Constructor Params

A shortcut to create and set properties automatically when you create a class instance.

## Why Use This?

Normally, creating a property requires multiple steps:

```typescript
// The long way
class User {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;  // Repeat "name" multiple times
    this.age = age;    // Repeat "age" multiple times
  }
}
```

TypeScript lets you skip the repetition by putting access modifiers directly in the constructor parameters:

```typescript
// The short way - TypeScript does the work for you!
class User {
  constructor(public name: string, public age: number) {}
}
```

## How It Works

When you add `public`, `private`, or `protected` to a constructor parameter, TypeScript automatically:
1. Creates a property with that name
2. Assigns the parameter value to the property
3. Lets you skip writing `this.propertyName = parameterName`

## Examples

### Basic Example

```typescript
class Person {
  // These parameters automatically become properties
  constructor(public name: string, public age: number) {}
}

const person = new Person('Alice', 30);
console.log(person.name); // 'Alice'
console.log(person.age);  // 30
```

### Using Different Access Levels

```typescript
class Employee {
  constructor(
    public name: string,      // Anyone can access
    private salary: number,   // Only the class can access
    protected department: string  // Class and subclasses can access
  ) {}

  displayInfo(): void {
    console.log(`${this.name} works in ${this.department}`);
  }
}

const emp = new Employee('Bob', 50000, 'Engineering');
console.log(emp.name);        // OK: 'Bob'
console.log(emp.salary);       // Error: private property
console.log(emp.department);   // Error: protected property
```

## Common Mistakes to Avoid

- **Forgetting the access modifier** — You must include `public`, `private`, or `protected` for this shortcut to work
- **Mixing styles** — Don't mix shortcut syntax with manual property declarations unless you know why

Learn more from the following links:

- [@official@TypeScript - Constructors](https://www.typescriptlang.org/docs/handbook/2/classes.html#constructors)

# Classes

A class is a blueprint for creating objects that organize related data and functions together.

## Why Use Classes?

Instead of creating separate variables and functions everywhere, classes let you bundle them together in an organized way. This makes your code easier to understand, reuse, and maintain.

## How Classes Work

You define a class once using the `class` keyword, then create actual objects (called "instances") from it using the `new` keyword.

A class typically has:
- **Properties** — variables that store data (like a name or age)
- **Methods** — functions that perform actions
- **Constructor** — a special function that runs when you create a new instance

## Simple Example

```typescript
class Animal {
  // Property: stores the animal's name
  name: string;

  // Constructor: runs when you create a new Animal
  constructor(name: string) {
    this.name = name;
  }

  // Method: a function that does something
  makeSound(): void {
    console.log(`${this.name} is making a sound`);
  }
}

// Create a new Animal instance
const dog = new Animal('Dog');

// Access the method
dog.makeSound(); // Output: Dog is making a sound
```

## Real-World Example

Imagine building a bank account system:

```typescript
class BankAccount {
  accountHolder: string;
  balance: number;

  constructor(accountHolder: string, initialBalance: number) {
    this.accountHolder = accountHolder;
    this.balance = initialBalance;
  }

  // Method to deposit money
  deposit(amount: number): void {
    this.balance += amount;
    console.log(`${this.accountHolder} deposited $${amount}`);
  }

  // Method to check balance
  getBalance(): number {
    return this.balance;
  }
}

// Create an account
const myAccount = new BankAccount('Alice', 1000);
myAccount.deposit(500);
console.log(myAccount.getBalance()); // 1500
```

## Common Mistakes to Avoid

- **Forgetting `new`** — Always use `new` when creating an instance: `new Animal()`, not `Animal()`
- **Forgetting `this`** — Use `this.propertyName` to access properties inside methods: `this.name`, not `name`

Learn more from the following resources:

- [@official@Tutorial - Classes](https://www.typescriptlang.org/docs/handbook/2/classes.html)

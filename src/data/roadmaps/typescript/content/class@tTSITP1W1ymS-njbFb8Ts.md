# Class

## What is a Class?

A **class** is a blueprint for creating objects. It's like a template that defines what properties and methods (functions) an object should have. When you create an object from a class, it's called an instance.

Classes are fundamental to object-oriented programming. They help you:

- **Organize code**: Group related data and functions together
- **Reuse patterns**: Create multiple similar objects easily
- **Encapsulate logic**: Hide complex details inside the class
- **Maintain state**: Objects remember their own data

## Basic Class Structure

```typescript
class Car {
  // Properties (data about the car)
  make: string;
  model: string;
  year: number;

  // Constructor (runs when you create a new Car)
  constructor(make: string, model: string, year: number) {
    this.make = make;
    this.model = model;
    this.year = year;
  }

  // Methods (what the car can do)
  drive() {
    console.log(`Driving my ${this.year} ${this.make} ${this.model}`);
  }
}

// Create an instance
const myCar = new Car("Toyota", "Camry", 2023);
myCar.drive(); // Driving my 2023 Toyota Camry
```

## Real-World Example: Bank Account

```typescript
class BankAccount {
  accountHolder: string;
  balance: number;

  constructor(accountHolder: string, initialBalance: number) {
    this.accountHolder = accountHolder;
    this.balance = initialBalance;
  }

  // Deposit money
  deposit(amount: number): void {
    if (amount > 0) {
      this.balance += amount;
      console.log(`Deposited $${amount}. New balance: $${this.balance}`);
    }
  }

  // Withdraw money
  withdraw(amount: number): void {
    if (amount > 0 && amount <= this.balance) {
      this.balance -= amount;
      console.log(`Withdrew $${amount}. New balance: $${this.balance}`);
    } else {
      console.log("Insufficient funds or invalid amount");
    }
  }

  // Check balance
  getBalance(): number {
    return this.balance;
  }
}

// Using the class
const account = new BankAccount("Alice", 1000);
account.deposit(500); // Deposited $500. New balance: $1500
account.withdraw(200); // Withdrew $200. New balance: $1300
console.log(account.getBalance()); // 1300
```

## Practical Example: User Management

```typescript
class User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;

  constructor(id: number, name: string, email: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.isActive = true; // New users are active by default
  }

  // Deactivate user
  deactivate(): void {
    this.isActive = false;
    console.log(`User ${this.name} has been deactivated`);
  }

  // Reactivate user
  activate(): void {
    this.isActive = true;
    console.log(`User ${this.name} has been reactivated`);
  }

  // Get user info
  getInfo(): string {
    return `${this.name} (${this.email}) - ${
      this.isActive ? "Active" : "Inactive"
    }`;
  }
}

const user = new User(1, "Bob", "bob@example.com");
console.log(user.getInfo()); // Bob (bob@example.com) - Active
user.deactivate();
console.log(user.getInfo()); // Bob (bob@example.com) - Inactive
```

## Access Modifiers (Controlling Visibility)

Control who can access properties and methods:

```typescript
class Employee {
  public name: string; // Anyone can access
  private salary: number; // Only this class can access
  protected department: string; // This class and subclasses can access

  constructor(name: string, salary: number, department: string) {
    this.name = name;
    this.salary = salary;
    this.department = department;
  }

  public getInfo(): string {
    return `${this.name} works in ${this.department}`;
  }

  // Only the class can call this
  private getSalary(): number {
    return this.salary;
  }
}

const emp = new Employee("John", 60000, "Engineering");
console.log(emp.name); // ✓ OK - public
console.log(emp.getInfo()); // ✓ OK - public method
// console.log(emp.salary);       // ❌ Error - private
// console.log(emp.getSalary()); // ❌ Error - private method
```

## Inheritance (Extending Classes)

Create new classes based on existing ones:

```typescript
class Animal {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  speak(): void {
    console.log(`${this.name} makes a sound`);
  }
}

class Dog extends Animal {
  breed: string;

  constructor(name: string, breed: string) {
    super(name); // Call parent constructor
    this.breed = breed;
  }

  // Override parent method
  speak(): void {
    console.log(`${this.name} barks!`);
  }

  getBreedInfo(): string {
    return `${this.name} is a ${this.breed}`;
  }
}

const dog = new Dog("Buddy", "Golden Retriever");
dog.speak(); // Buddy barks!
console.log(dog.getBreedInfo()); // Buddy is a Golden Retriever
```

## Constructors and Initialization

The constructor runs when you create a new instance:

```typescript
class Todo {
  id: number;
  title: string;
  completed: boolean;
  createdAt: Date;

  constructor(id: number, title: string) {
    this.id = id;
    this.title = title;
    this.completed = false;
    this.createdAt = new Date();
  }

  complete(): void {
    this.completed = true;
    console.log(`Todo "${this.title}" marked as complete!`);
  }
}

const myTodo = new Todo(1, "Learn TypeScript");
myTodo.complete(); // Todo "Learn TypeScript" marked as complete!
```

## Static Properties and Methods

Properties and methods that belong to the class itself, not instances:

```typescript
class Counter {
  static count: number = 0; // Shared by all instances

  constructor() {
    Counter.count++; // Increment shared counter
  }

  static getCount(): number {
    return Counter.count;
  }
}

const c1 = new Counter();
const c2 = new Counter();
const c3 = new Counter();

console.log(Counter.getCount()); // 3 (all instances created)
```

## Classes vs Interfaces

| Feature                 | Class                          | Interface              |
| ----------------------- | ------------------------------ | ---------------------- |
| **Creates objects**     | Yes                            | No (type only)         |
| **Has implementation**  | Yes                            | No                     |
| **Can extend**          | Yes                            | Yes                    |
| **Can be instantiated** | Yes (with new)                 | No                     |
| **Best for**            | Creating objects with behavior | Defining object shapes |

```typescript
// Interface - just describes the shape
interface Shape {
  area(): number;
}

// Class - provides actual implementation
class Circle implements Shape {
  radius: number;

  constructor(radius: number) {
    this.radius = radius;
  }

  area(): number {
    return Math.PI * this.radius * this.radius;
  }
}

const circle = new Circle(5);
console.log(circle.area()); // 78.53981633974483
```

## Key Concepts for Beginners

1. **Class = Blueprint**: Templates for creating objects
2. **Constructor = Setup**: Runs when you create an instance with `new`
3. **Properties = Data**: What the object remembers
4. **Methods = Actions**: What the object can do
5. **Access Modifiers = Privacy**: Control who can see/use what
6. **Inheritance = Extending**: Create new classes from existing ones
7. **Instances = Real Objects**: Created from the class blueprint

## Real-World Analogy

Think of classes like cookie cutters:

- The **class** is the cookie cutter (blueprint)
- The **instance** is each individual cookie (created object)
- **Properties** are the cookie's flavor and decoration
- **Methods** are what you can do with the cookie (eat, share, decorate)

Learn more from the following links:

- [@official@TypeScript Classes](https://www.typescriptlang.org/docs/handbook/2/classes.html)

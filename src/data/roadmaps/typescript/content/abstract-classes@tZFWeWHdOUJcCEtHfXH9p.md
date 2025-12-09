# Abstract Classes

A blueprint for other classes that can't be used directly — it must be extended by other classes first.

## Why Use This?

Abstract classes let you:
- Define rules that all subclasses must follow
- Share common code between related classes
- Force subclasses to implement certain methods

Think of it like a template that says "All animals must make a sound, but I won't tell you HOW."

## How It Works

You create a class with `abstract` keyword. You can:
- Define `abstract methods` with no body — subclasses MUST implement them
- Define regular methods with code — subclasses can use them as-is or override them
- Never create instances directly — you must extend it first

## Simple Example

```typescript
// This is a blueprint, not a real thing you can use
abstract class Animal {
  // All animals MUST make a sound
  // (But we don't know HOW yet)
  abstract makeSound(): void;

  // All animals can move (we know HOW)
  move(): void {
    console.log('moving...');
  }
}

// This is a real thing you can use
class Dog extends Animal {
  // Dog MUST implement makeSound
  makeSound(): void {
    console.log('bark');
  }
}

class Cat extends Animal {
  // Cat MUST implement makeSound
  makeSound(): void {
    console.log('meow');
  }
}

// Using the classes
const dog = new Dog();   // OK
const cat = new Cat();   // OK
const animal = new Animal();  // Error: Can't create abstract class
```

## Real-World Example

Imagine building a payment system:

```typescript
// Blueprint that payment methods must follow
abstract class PaymentMethod {
  abstract processPayment(amount: number): void;
  abstract getTransactionFee(amount: number): number;

  // Common behavior shared by all payment types
  logTransaction(amount: number): void {
    console.log(`Transaction of $${amount} initiated`);
  }
}

// Concrete payment type
class CreditCard extends PaymentMethod {
  processPayment(amount: number): void {
    console.log(`Charging credit card $${amount}`);
    this.logTransaction(amount);
  }

  getTransactionFee(amount: number): number {
    return amount * 0.03; // 3% fee
  }
}

// Another concrete payment type
class PayPal extends PaymentMethod {
  processPayment(amount: number): void {
    console.log(`Sending via PayPal $${amount}`);
    this.logTransaction(amount);
  }

  getTransactionFee(amount: number): number {
    return amount * 0.025; // 2.5% fee
  }
}

const cc = new CreditCard();
cc.processPayment(100);
console.log('Fee:', cc.getTransactionFee(100)); // 3
```

## Common Mistakes to Avoid

- **Forgetting to implement abstract methods** — TypeScript will error if you don't
- **Trying to create abstract class instances** — Always extend it first
- **Making everything abstract** — Only use abstract methods when subclasses really need different implementations

Learn more from the following resources:

- [@official@Abstract Classes](https://www.typescriptlang.org/docs/handbook/2/classes.html#abstract-classes-and-members)

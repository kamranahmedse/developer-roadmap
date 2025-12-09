# Inheritance vs Polymorphism

Two powerful ways to reuse and organize your code using classes.

## Inheritance — Copy and Extend

A subclass inherits (copies) properties and methods from a parent class, then adds its own.

**Why use it?** — Avoid repeating the same code. For example, `Dog` and `Cat` both need a `name` and `makeSound()`, so they inherit from `Animal`.

### Simple Example

```typescript
// Parent class
class Animal {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  // All animals can move
  move(): void {
    console.log(`${this.name} is moving`);
  }
}

// Subclass - inherits from Animal using 'extends'
class Dog extends Animal {
  // Dog automatically gets name and move()
  // Now add what makes Dog special
  bark(): void {
    console.log('Woof!');
  }
}

const dog = new Dog('Buddy');
dog.move();   // Inherited from Animal
dog.bark();   // Dog's own method
```

## Polymorphism — Many Forms

Polymorphism means "many forms." Different classes can have the same method name, but each does something different. You can treat them all as the same type.

**Why use it?** — Write flexible code that works with any subclass without knowing which one it is.

### Example

```typescript
class Animal {
  makeSound(): void {
    console.log('Making animal sound');
  }
}

class Dog extends Animal {
  // Override the method - same name, different behavior
  makeSound(): void {
    console.log('Bark');
  }
}

class Cat extends Animal {
  // Override the method - same name, different behavior
  makeSound(): void {
    console.log('Meow');
  }
}

class Bird extends Animal {
  makeSound(): void {
    console.log('Tweet');
  }
}

// The magic of polymorphism:
// We don't need to know what TYPE it is - we just call makeSound()
let animal: Animal;  // Type is "Animal"

animal = new Dog();
animal.makeSound(); // Output: Bark (even though type is Animal)

animal = new Cat();
animal.makeSound(); // Output: Meow (even though type is Animal)

animal = new Bird();
animal.makeSound(); // Output: Tweet (even though type is Animal)
```

## Real-World Example — Payment System

Polymorphism shines here:

```typescript
// Parent class
class PaymentMethod {
  processPayment(amount: number): void {
    console.log(`Payment of $${amount}`);
  }
}

class CreditCard extends PaymentMethod {
  processPayment(amount: number): void {
    console.log(`💳 Charging credit card $${amount}`);
  }
}

class PayPal extends PaymentMethod {
  processPayment(amount: number): void {
    console.log(`📱 Sending via PayPal $${amount}`);
  }
}

class Bitcoin extends PaymentMethod {
  processPayment(amount: number): void {
    console.log(`₿ Sending ${amount} satoshis`);
  }
}

// Your code doesn't need to know WHICH payment method
// It just works with any PaymentMethod
function checkout(payment: PaymentMethod, amount: number): void {
  payment.processPayment(amount);
  console.log('Payment complete!\n');
}

// Use any payment type - same function works for all
checkout(new CreditCard(), 100);
checkout(new PayPal(), 100);
checkout(new Bitcoin(), 100);
```

## How They Work Together

| Concept | What It Does | Example |
|---|---|---|
| **Inheritance** | Subclass gets properties/methods from parent | `Dog extends Animal` — Dog gets `move()` |
| **Polymorphism** | Different classes override the same method | `Dog`, `Cat`, `Bird` each have their own `makeSound()` |

## Benefits

- **Less repeated code** — Use inheritance to share common functionality
- **Flexible code** — Polymorphism lets you use any subclass without changing your code
- **Easy to extend** — Add new classes without breaking existing code

## Common Mistakes to Avoid

- **Overusing inheritance** — Don't create deep chains like `Animal > Dog > Labrador > SmallLabrador`
- **Forgetting to override methods** — If a subclass needs different behavior, use polymorphism (override the method)
- **Mixing inheritance levels** — Keep inheritance trees shallow and simple

Learn more from the following resources:

- [@article@Dev.to - Mastering OOP in TypeScript](https://dev.to/rajrathod/mastering-object-oriented-programming-with-typescript-encapsulation-abstraction-inheritance-and-polymorphism-explained-c6p)
- [@video@Inheritance and Polymorphism In TypeScript](https://www.youtube.com/watch?v=Sn6K57YSuwU)

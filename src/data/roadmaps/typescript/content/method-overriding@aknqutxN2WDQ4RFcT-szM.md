# Method Overriding

Change how an inherited method works by creating a new version of it in your subclass.

## Why Use This?

When you inherit from a parent class, you get all its methods. But sometimes you need a method to work differently in your subclass. Method overriding lets you replace the parent's implementation with your own.

Think of it like a recipe: the parent class says "make a sound," but each animal subclass says "make this specific sound."

## How It Works

1. The parent class defines a method
2. The subclass creates a method with the **exact same name and parameters**
3. When called on the subclass, the new version runs instead of the parent's

## Simple Example

```typescript
class Animal {
  makeSound(): void {
    console.log('Making animal sound');
  }
}

class Dog extends Animal {
  // Override: create a new version of makeSound
  makeSound(): void {
    console.log('Bark');
  }
}

class Cat extends Animal {
  // Override: each animal makes its own sound
  makeSound(): void {
    console.log('Meow');
  }
}

// Using the overridden methods
const dog = new Dog();
dog.makeSound(); // Output: Bark (uses Dog's version, not Animal's)

const cat = new Cat();
cat.makeSound(); // Output: Meow (uses Cat's version, not Animal's)
```

## Practical Example

Imagine a game with different character types:

```typescript
class Character {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  // Parent version: generic attack
  attack(): void {
    console.log(`${this.name} attacks for 10 damage`);
  }
}

class Knight extends Character {
  // Override: Knights have stronger attacks
  attack(): void {
    console.log(`${this.name} swings sword for 20 damage`);
  }
}

class Mage extends Character {
  // Override: Mages cast spells
  attack(): void {
    console.log(`${this.name} casts fireball for 25 damage`);
  }
}

class Archer extends Character {
  // Override: Archers shoot arrows
  attack(): void {
    console.log(`${this.name} shoots arrow for 15 damage`);
  }
}

// Same method name, different behaviors
const knight = new Knight('Aragorn');
knight.attack(); // Output: Aragorn swings sword for 20 damage

const mage = new Mage('Gandalf');
mage.attack(); // Output: Gandalf casts fireball for 25 damage

const archer = new Archer('Legolas');
archer.attack(); // Output: Legolas shoots arrow for 15 damage
```

## Using the Parent's Version

Sometimes you want to call the parent's method AND add extra behavior:

```typescript
class Animal {
  makeSound(): void {
    console.log('Making animal sound');
  }
}

class Dog extends Animal {
  makeSound(): void {
    // Call the parent's version first
    super.makeSound();
    
    // Then add extra behavior
    console.log('Bark');
  }
}

const dog = new Dog();
dog.makeSound();
// Output:
// Making animal sound
// Bark
```

## Common Mistakes to Avoid

- **Wrong signature** — The method name, parameters, and return type must match exactly, or it's a new method, not an override
- **Forgetting `super` when needed** — Use `super.methodName()` if you want to call the parent's version
- **Breaking the parent's contract** — Don't change what the method does so much that it confuses users expecting the parent's behavior

```typescript
// ❌ NOT an override - different parameters
class Dog extends Animal {
  makeSound(volume: number): void {  // Added a parameter!
    console.log('Bark');
  }
}

// ✅ Correct override - exact same signature
class Dog extends Animal {
  makeSound(): void {  // Exactly matches parent
    console.log('Bark');
  }
}
```

Learn more from the following resources:

- [@official@TypeScript - Overriding Methods](https://www.typescriptlang.org/docs/handbook/2/classes.html#overriding-methods)

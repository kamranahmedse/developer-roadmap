# instanceof Operator

**Check if an object is an instance of a specific class using `instanceof`.**

## Why Use instanceof?

The `instanceof` operator helps you determine if an object was created from a particular class. This is useful when you have different types of objects and need to treat them differently.

## How It Works

`instanceof` checks the object's "constructor chain" to see if it matches the class you're checking for. It returns `true` if the object is an instance of that class, and `false` otherwise.

## Basic Example

```typescript
class Bird {
  fly() {
    console.log('flying...');
  }
  layEggs() {
    console.log('laying eggs...');
  }
}

const pet = new Bird();

// Check if pet is a Bird
if (pet instanceof Bird) {
  pet.fly(); // Safe to call bird methods
} else {
  console.log('pet is not a bird');
}
```

## Practical Example

```typescript
class Dog {
  bark() {
    console.log('Woof!');
  }
}

class Cat {
  meow() {
    console.log('Meow!');
  }
}

function makeSound(animal: Dog | Cat) {
  if (animal instanceof Dog) {
    animal.bark(); // TypeScript knows it's a Dog
  } else if (animal instanceof Cat) {
    animal.meow(); // TypeScript knows it's a Cat
  }
}

makeSound(new Dog()); // "Woof!"
makeSound(new Cat()); // "Meow!"
```

## When to Use

- When you have multiple class types and need to handle each differently
- To check if an object is a specific class before calling class-specific methods
- When working with class hierarchies and inheritance

## Limitations

- Only works with classes, not with interfaces or type aliases
- Won't work with primitive types (string, number, boolean)
- For primitives, use `typeof` instead

Learn more from the following links:

- [@official@instanceof Operator](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#instanceof-narrowing)

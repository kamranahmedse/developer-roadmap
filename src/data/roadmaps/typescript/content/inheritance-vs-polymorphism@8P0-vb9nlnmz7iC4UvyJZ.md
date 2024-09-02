# Inheritance vs Polymorphism

Inheritance and polymorphism are two fundamental concepts in object-oriented programming, and they are supported in TypeScript as well.

Inheritance refers to a mechanism where a subclass inherits properties and methods from its parent class. This allows a subclass to reuse the code and behavior of its parent class while also adding or modifying its own behavior. In TypeScript, inheritance is achieved using the extends keyword.

Polymorphism refers to the ability of an object to take on many forms. This allows objects of different classes to be treated as objects of a common class, as long as they share a common interface or inheritance hierarchy. In TypeScript, polymorphism is achieved through method overriding and method overloading.

```typescript
class Animal {
  makeSound(): void {
    console.log('Making animal sound');
  }
}

class Dog extends Animal {
  makeSound(): void {
    console.log('Bark');
  }
}

class Cat extends Animal {
  makeSound(): void {
    console.log('Meow');
  }
}

let animal: Animal;

animal = new Dog();
animal.makeSound(); // Output: Bark

animal = new Cat();
animal.makeSound(); // Output: Meow
```

Learn more from the following resources:

- [@article@Dev.to - Mastering OOP in TypeScript](https://dev.to/rajrathod/mastering-object-oriented-programming-with-typescript-encapsulation-abstraction-inheritance-and-polymorphism-explained-c6p)
- [@video@Inheritance and Polymorphism In TypeScript](https://www.youtube.com/watch?v=Sn6K57YSuwU)

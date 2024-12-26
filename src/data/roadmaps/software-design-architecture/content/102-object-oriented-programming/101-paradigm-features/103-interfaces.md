# Interface

## Definition
In object-oriented programming (OOP), an **interface** is a contract that defines a set of methods and properties that a class must implement. It specifies **what behaviors a class should provide**, but it does not include the implementation details (though modern languages may allow optional default implementations like Kotlin and Java-8).

An interface can include:
- **Method signatures**: Declaring what methods a class should implement.
- **Constants**: Defining fixed values that implementing classes can use.
- **Default method implementations** (in some modern languages): Providing optional behavior that implementing classes can override.

---

## Purpose of an Interface
1. **Define Common Behavior**: Interfaces establish a shared set of behaviors for related or even unrelated classes.
2. **Enable Polymorphism**: They allow objects of different classes to be treated uniformly if they implement the same interface.
3. **Encourage Decoupling**: By relying on interfaces rather than specific implementations, systems become more modular and maintainable.

---

## Key Characteristics
- A class that implements an interface must provide concrete implementations for all of its methods unless the class itself is abstract.
- Interfaces allow a class to inherit behavior from multiple sources, as a class can implement multiple interfaces even though it can only inherit from one base class.
- Interfaces cannot have state (fields with values), but they can define constants.

Learn more from the following resources:

- [@video@Fundamental concepts: What's an Interface?](https://www.youtube.com/watch?v=o1jBgdhQsGo)
- [@Article@Kotlin Interfaces](https://medium.com/huawei-developers/kotlin-interface-example-da68b05828cd)

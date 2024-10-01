# Factory Pattern

The **Factory Pattern** is part of the Creational Design Patterns. This pattern provides an interface for creating objects in a superclass, but allows subclasses to alter the type of objects that will be created. It introduces an abstraction layer between the client code and the concrete objects. Normally, this is achieved by using a factory method to create objects instead of using constructors. The instance of the class is usually created by a method, referred to as a `factory method`, which is either specified in an interface and implemented in implementing classes or implemented in a base class which may be optionally overridden by derived classes. The Factory Method is used when we want to provide users with a way to create an instance of a class from one of several possible classes that share a common super class.

Here is a basic example of the Factory Pattern:

```java
public abstract class Animal {
    public abstract String makeSound();
}

public class Dog extends Animal {
    @override
    public String makeSound() {
        return "Woof";
    }
}

public class Cat extends Animal {
    @override
    public String makeSound() {
        return "Meow";
    }
}

public class AnimalFactory {
    public Animal createAnimal(String type) {
        if ("Dog".equals(type)) {
            return new Dog();
        } else if ("Cat".equals(type)) {
            return new Cat();
        }
        return null;
    }
}
```

Visit the following resources to learn more:

- [@official@Android: Factory Pattern](https://developer.android.com/guide/components/intents-filters#factory)

# Multiple Inheritance

Multiple inheritance is a feature in C++ where a class can inherit characteristics (data members and member functions) from more than one parent class. The concept is similar to single inheritance (where a class inherits from a single base class), but in multiple inheritance, a class can have multiple base classes.

When a class inherits multiple base classes, it becomes a mixture of their properties and behaviors, and can override or extend them as needed.

## Syntax

Here is the syntax to declare a class with multiple inheritance:

```cpp
class DerivedClass : access-specifier BaseClass1, access-specifier BaseClass2, ...
{
    // class body
};
```

The `DerivedClass` will inherit members from both `BaseClass1` and `BaseClass2`. The `access-specifier` (like `public`, `protected`, or `private`) determines the accessibility of the inherited members.

## Example

Here is an example of multiple inheritance in action:

```cpp
#include <iostream>

// Base class 1
class Animal
{
public:
    void eat()
    {
        std::cout << "I can eat!\n";
    }
};

// Base class 2
class Mammal
{
public:
    void breath()
    {
        std::cout << "I can breathe!\n";
    }
};

// Derived class inheriting from both Animal and Mammal
class Dog : public Animal, public Mammal
{
public:
    void bark()
    {
        std::cout << "I can bark! Woof woof!\n";
    }
};

int main()
{
    Dog myDog;

    // Calling members from both base classes
    myDog.eat();
    myDog.breath();
    
    // Calling a member from the derived class
    myDog.bark();

    return 0;
}
```

## Note

In some cases, multiple inheritance can lead to complications such as ambiguity and the "diamond problem". Ensure that you use multiple inheritance judiciously and maintain well-structured and modular classes to prevent issues.

For more information on C++ multiple inheritance and related topics, refer to C++ documentation or a comprehensive C++ programming guide.
# Virtual Methods

Virtual methods are a key aspect of dynamic polymorphism in C++. They allow subclass methods to override the methods of their base class, so the appropriate method is called depending on the actual type of an object at runtime.

To declare a method as virtual, simply use the `virtual` keyword in the method's declaration in the base class. This tells the compiler that the method should be treated as a virtual method, allowing it to be overridden by derived classes.

## Code Example

Here's an example demonstrating virtual methods:

```cpp
#include <iostream>

// Base class
class Shape {
public:
    virtual double area() const {
        return 0;
    }
};

// Derived class
class Circle : public Shape {
public:
    Circle(double r) : radius(r) {}

    // Override the base class method
    double area() const override {
        return 3.14 * radius * radius;
    }

private:
    double radius;
};

// Derived class
class Rectangle : public Shape {
public:
    Rectangle(double w, double h) : width(w), height(h) {}

    // Override the base class method
    double area() const override {
        return width * height;
    }

private:
    double width;
    double height;
};

int main() {
    Circle c(5);
    Rectangle r(4, 6);

    Shape* shape = &c;
    std::cout << "Circle's area: " << shape->area() << '\n';

    shape = &r;
    std::cout << "Rectangle's area: " << shape->area() << '\n';

    return 0;
}
```

In this example, we define a base class `Shape` that has a virtual method `area`. This method is then overridden by the derived classes `Circle` and `Rectangle`. By using a virtual method and a base class pointer to the derived objects, we can invoke the appropriate `area` method based on the actual object type at runtime.
# Language Concepts in C++

C++ is a powerful, high-level, object-oriented programming language that offers several key language concepts. These concepts provide the foundation upon which you can build efficient, reliable, and maintainable programs. Here's a brief summary of some important language concepts in C++.

## Variables and Data Types
C++ provides various fundamental data types such as `int`, `float`, `double`, `char`, and `bool` to declare and manipulate variables in a program.

Example:
```cpp
int age = 25;
float height = 1.7f;
double salary = 50000.0;
char grade = 'A';
bool isEmployed = true;
```

## Control Structures
Control structures enable you to control the flow of execution of a program. Key control structures in C++ include:

- Conditional statement: `if`, `else`, and `else if`
- Loop constructs: `for`, `while`, and `do-while`
- Switch-case construct

Example:
```cpp
// If-else statement
if (age > 18) {
    std::cout << "You are eligible to vote.";
} else {
    std::cout << "You are not eligible to vote.";
}

// For loop
for (int i = 0; i < 5; i++) {
    std::cout << "Hello World!";
}
```

## Functions
Functions in C++ allow you to break down a large program into small, manageable, and reusable pieces of code.

Example:
```cpp
int add(int a, int b) {
    return a + b;
}

int main() {
    int sum = add(10, 20);
    std::cout << "The sum is: " << sum;
    return 0;
}
```

## Arrays and Vectors
Arrays and Vectors are commonly used data structures to store and manipulate a collection of elements of the same datatype.

Example:
```cpp
// Array
int marks[] = {90, 80, 95, 85};

// Vector
std::vector<int> scores = {10, 20, 30, 40};
```

## Pointers
Pointers are variables that store memory addresses of other variables. They enable more efficient handling of memory, and are useful for working with dynamic data structures.

Example:
```cpp
int num = 10;
int* p = &num; // p stores the address of num
```

## Structures and Classes
Structures and Classes are user-defined data types that allow grouping of variables and functions under a single name.

Example:
```cpp
// Structure
struct Student {
    std::string name;
    int age;
};

// Class
class Employee {
public:
    std::string name;
    int age;
    void displayInfo() {
        std::cout << "Name: " << name << "\nAge: " << age;
    }
};
```

## Inheritance and Polymorphism
Inheritance is a mechanism that allows a class to inherit properties and methods from a base class. Polymorphism enables you to use a base class type to represent derived class objects.

Example:
```cpp
class Base {
public:
    void display() {
        std::cout << "This is the base class.";
    }
};

class Derived : public Base {
public:
    void display() {
        std::cout << "This is the derived class.";
    }
};
```

## Exception Handling
C++ provides a mechanism to handle exceptions(runtime errors) gracefully using `try`, `catch`, and `throw` constructs.

Example:
```cpp
try {
    // Code that might throw an exception
    int result = a / b;
} catch (const exception &e) {
    std::cout << "Caught an exception: " << e.what();
}
```

These are some of the key language concepts in C++, which will help you to understand the language better and develop efficient and maintainable applications.

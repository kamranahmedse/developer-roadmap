# Scope in C++

**Scope** refers to the visibility and accessibility of variables, functions, classes, and other identifiers in a C++ program. It determines the lifetime and extent of these identifiers. In C++, there are four types of scope:

- **Global scope:** Identifiers declared outside any function or class have a global scope. They can be accessed from any part of the program (unless hidden by a local identifier with the same name). The lifetime of a global identifier is the entire duration of the program.

```cpp
#include <iostream>

int globalVar; // This is a global variable

int main() {
    std::cout << "Global variable: " << globalVar << '\n';
}
```

- **Local scope:** Identifiers declared within a function or a block have a local scope. They can be accessed only within the function or the block they were declared in. Their lifetime is limited to the duration of the function/block execution.

```cpp
#include <iostream>

void localExample() {
    int localVar; // This is a local variable
    localVar = 5;
    std::cout << "Local variable: " << localVar << '\n';
}

int main() {
    localExample();
    // std::cout << localVar << '\n'; //error: ‘localVar’ was not declared in this scope
}
```

- **Namespace scope:** A namespace is a named scope that groups related identifiers together. Identifiers declared within a namespace have the namespace scope. They can be accessed using the namespace name and the scope resolution operator `::`.

```cpp
#include <iostream>

namespace MyNamespace {
    int namespaceVar = 42;
}

int main() {
    std::cout << "Namespace variable: " << MyNamespace::namespaceVar << '\n';
}
```

- **Class scope:** Identifiers declared within a class have a class scope. They can be accessed using the class name and the scope resolution operator `::` or, for non-static members, an object of the class and the dot `.` or arrow `->` operator.

```cpp
#include <iostream>

class MyClass {
public:
    static int staticMember;
    int nonStaticMember;

    MyClass(int value) : nonStaticMember(value) {}
};

int MyClass::staticMember = 7;

int main() {
    MyClass obj(10);
    std::cout << "Static member: " << MyClass::staticMember << '\n';
    std::cout << "Non-static member: " << obj.nonStaticMember << '\n';
}
```

Understanding various types of scope in C++ is essential for effective code structuring and management of resources in a codebase.
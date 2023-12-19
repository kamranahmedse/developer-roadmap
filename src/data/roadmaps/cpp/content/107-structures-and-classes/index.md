# Structures and Classes in C++

Structures and classes are user-defined data types in C++ that allow for the grouping of variables of different data types under a single name. They make it easier to manage and organize complex data by creating objects that have particular attributes and behaviors. The main difference between a structure and a class is their default access specifier: members of a structure are public by default, while members of a class are private.

## Structures

A structure is defined using the `struct` keyword, followed by the structure's name and a set of curly braces `{}` enclosing the members (variables and/or functions) of the structure. The members can be of different data types. To create an object of the structure's type, use the structure name followed by the object name.

Here's an example of defining a structure and creating an object:

```cpp
struct Employee {
    int id;
    std::string name;
    float salary;
};

Employee e1; // create an object of the 'Employee' structure
```

You can access the members of a structure using the dot operator `.`:

```cpp
e1.id = 1;
e1.name = "John Doe";
e1.salary = 40000;
```

## Classes

A class is defined using the `class` keyword, followed by the class's name and a set of curly braces `{}` enclosing the members (variables and/or functions) of the class. Like structures, class members can be of different data types. You can create objects of a class using the class name followed by the object name.

Here's an example of a class definition and object creation:

```cpp
class Student {
    int roll_no;
    std::string name;
    float marks;

public:
    void set_data(int r, std::string n, float m) {
        roll_no = r;
        name = n;
        marks = m;
    }

    void display() {
        std::cout << "Roll no: " << roll_no
                  << "\nName: " << name
                  << "\nMarks: " << marks << std::endl;
    }
};

Student s1; // create an object of the 'Student' class
```

Since the data members of a class are private by default, we cannot access them directly using the dot operator from outside the class. Instead, we use public member functions to set or get their values:

```cpp
s1.set_data(1, "Alice", 95.0);
s1.display();
```

That's a brief summary of structures and classes in C++. Remember that while they may seem similar, classes provide more control over data encapsulation and can be used to implement more advanced features like inheritance and polymorphism.
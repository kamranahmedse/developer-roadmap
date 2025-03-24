# Data Types in C++

In C++, data types are used to categorize different types of data that a program can process. They are essential for determining the type of value a variable can hold and how much memory space it will occupy. Some basic data types in C++ include integers, floating-point numbers, characters, and booleans.

## Fundamental Data Types

## Integer (int)
Integers are whole numbers that can store both positive and negative values. The size of `int` depends on the system architecture (usually 4 bytes). 

Example:
```cpp
int num = 42;
```

There are variants of `int` that can hold different ranges of numbers:
- short (`short int`): Smaller range than `int`.
- long (`long int`): Larger range than `int`.
- long long (`long long int`): Even larger range than `long int`.

## Floating-Point (float, double)
Floating-point types represent real numbers, i.e., numbers with a decimal point. There are two main floating-point types:

- **float**: Provides single-precision floating-point numbers. It typically occupies 4 bytes of memory.

Example:
```cpp
float pi = 3.14f;
```

- **double**: Provides double-precision floating-point numbers. It consumes more memory (usually 8 bytes) but has a higher precision than `float`.

Example:
```cpp
double pi_high_precision = 3.1415926535;
```

## Character (char)
Characters represent a single character, such as a letter, digit, or symbol. They are stored using the ASCII value of the symbol and typically occupy 1 byte of memory.

Example:
```cpp
char letter = 'A';
```

## Boolean (bool)
Booleans represent logical values: `true` or `false`. They usually occupy 1 byte of memory.

Example:
```cpp
bool is_cpp_great = true;
```

## Derived Data Types

Derived data types are types that are derived from fundamental data types. Some examples include:

## Arrays
Arrays are used to store multiple values of the same data type in consecutive memory locations.

Example:
```cpp
int numbers[5] = {1, 2, 3, 4, 5};
```

## Pointers
Pointers are used to store the memory address of a variable.

Example:
```cpp
int num = 42;
int* pNum = &num;
```

## References
References are an alternative way to share memory locations between variables, allowing you to create an alias for another variable.

Example:
```cpp
int num = 42;
int& numRef = num;
```

## User-Defined Data Types

User-defined data types are types that are defined by the programmer, such as structures, classes, and unions.

## Structures (struct)
Structures are used to store different data types under a single variable and accessibility of member variables and methods are public.

Example:
```cpp
struct Person {
    std::string name;
    int age;
    float height;
};

Person p1 = {"John Doe", 30, 5.9};
```

## Classes (class)
Classes are similar to structures, but the accessibility of the member data and function are governed by access specifiers. By default access to members of a class is private.

Example:
```cpp
class Person {
public:
    std::string name;
    int age;

    void printInfo() {
        std::cout << "Name: " << name << ", Age: " << age << '\n';
    };
};

Person p1;
p1.name = "John Doe";
p1.age = 30;
```

## Unions (union)
Unions are used to store different data types in the same memory location.

Example:
```cpp
union Data {
    int num;
    char letter;
    float decimal;
};

Data myData;
myData.num = 42;
```

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
        std::cout << "Name: " << name << ", Age: " << age << std::endl;
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
complete C++ program to run on IDE or MSVC with examples to understand.
// helloworld.cpp : This file contains the 'main' function. Program execution begins and ends there.
//

#include <iostream>
using namespace std;
//User defined data type 
// Class are similar to structures, but the accessibility of the member data and function are governed by access specifiers.
 // By default access to members of a class is private.

class Persons {
public:
    string names;
    int ages;
    float heights;
    void printinfo() {
        cout << "Name is " << names << ", age is " << ages << ", height is " << heights << endl;
    };
};
int main()
{
    // Fundamental Data Types
    int num_i = 67;
    float num_f = 3.14;
    double num_d = 3.156473839221;
    char letter = 'N';
    bool yes_no = true;
    // Derived Data types
    //Array consective memory location
    int array[2] = { 1,2 }; 
    // Pointers are used to store the memory address of a variable.
    int num = 43;
    int* pNum = &num;
    //References are an alternative way to share memory locations between variables,
    int& numRef = num;
    // User Defined Variables
    // Structures are used to store different data types under a single variable and 
    // accessibility of member variables and methods are public.
    struct person {
        string name;
        int age;
        float height;
    };
    person p1 = { "Namra", 23, 5.3 };
    // Unions are used to store different data types in the same memory location.
    union Data {
        int number;
        char letter;
        float decimal;
    };
    // Output the values
    cout << "Integer is: " << num_i << endl;
    cout << "Floating point is: " << num_f << endl;
    cout << "Double is: " << num_d << endl;
    cout << "Character is: " << letter << endl;
    cout << "Boolean is: " << (yes_no ? "true" : "false") << endl;
    //array printing
    cout << "Array is ";
    for (int i= 0; i < 2; i++)
    {
        cout << array[i] << " ";
    }
    cout << endl;
    cout << "Number for Pointer is " << num << endl;
    cout << "Memory address of number is " << pNum << endl;
    cout << "Reference of number is " << numRef << endl;
    cout << "Structure of person1 is " << endl;
    cout<<"Name is " << p1.name << endl;
    cout<<"Age is "<< p1.age << endl;
    cout<<"Height is " << p1.height << endl;
    Persons per1;
    per1.names = "Namra Mustafa";
    per1.ages = 24;
    per1.heights = 5.3;
    cout << "Class of Person is: " << endl;
    per1.printinfo();
    Data myData;
    myData.number = 43;
    myData.letter = 'N';
    myData.decimal = 3.14;
    cout << "Union Number is  " << myData.number << endl;
    cout << "Union character is  " << myData.letter << endl;
    cout << "Union floating point is  " << myData.decimal << endl;


}




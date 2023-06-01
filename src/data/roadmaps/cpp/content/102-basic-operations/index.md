# Basic Operations in C++

Basic operations in C++ refer to the fundamental arithmetic, relational, and logical operations that can be performed using C++ programming language, which are essential for any kind of program or calculation in a real-world scenario.

Here's a summary of the basic operations in C++

## Arithmetic Operations

These operations are used for performing calculations in C++ and include the following:

- **Addition (+)**: Adds two numbers.
```cpp
int a = 5;
int b = 6;
int sum = a + b; // sum is 11
```

- **Subtraction (-)**: Subtracts one number from the other.
```cpp
int a = 10;
int b = 6;
int diff = a - b; // diff is 4
```

- **Multiplication (*)**: Multiplies two numbers.
```cpp
int a = 3;
int b = 4;
int product = a * b; // product is 12
```

- **Division (/)**: Divides one number by another, yields quotient.
```cpp
int a = 12;
int b = 4;
int quotient = a / b; // quotient is 3
```

- **Modulus (%)**: Divides one number by another, yields remainder.
```cpp
int a = 15;
int b = 4;
int remainder = a % b; // remainder is 3
```

## Relational Operators

These operations compare two values and return a boolean value (true/false) depending on the comparison. The relational operations are:

- **Equal to (==)**: Returns true if both operands are equal.
```cpp
5 == 5 // true
3 == 4 // false
```

- **Not equal to (!=)**: Returns true if operands are not equal.
```cpp
5 != 2 // true
1 != 1 // false
```

- **Greater than (>)**: Returns true if the first operand is greater than the second.
```cpp
5 > 3 // true
2 > 3 // false
```

- **Less than (<)**: Returns true if the first operand is less than the second.
```cpp
3 < 5 // true
6 < 5 // false
```

- **Greater than or equal to (>=)**: Returns true if the first operand is greater than or equal to the second.
```cpp
5 >= 5 // true
6 >= 2 // true
3 >= 4 // false
```

- **Less than or equal to (<=)**: Returns true if the first operand is less than or equal to the second.
```cpp
4 <= 4 // true
2 <= 3 // true
5 <= 4 // false
```

## Logical Operators

Logical operators are used for combining multiple conditions or boolean values.

- **AND (&&)**: Returns true if both operands are true.
```cpp
true && true // true
true && false // false
```

- **OR (||)**: Returns true if any one of the operands is true.
```cpp
true || false // true
false || false // false
```

- **NOT (!)**: Returns true if the operand is false and vice versa.
```cpp
!true // false
!false // true
```
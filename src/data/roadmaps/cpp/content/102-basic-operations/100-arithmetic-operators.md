# Arithmetic Operators in C++

Arithmetic operators are used to perform mathematical operations with basic variables such as integers and floating-point numbers. Here is a brief summary of the different arithmetic operators in C++:

## 1. Addition Operator (`+`)

It adds two numbers together.

```cpp
int sum = a + b;
```

## 2. Subtraction Operator (`-`)

It subtracts one number from another.

```cpp
int difference = a - b;
```

## 3. Multiplication Operator (`*`)

It multiplies two numbers together.

```cpp
int product = a * b;
```

## 4. Division Operator (`/`)

It divides one number by another. Note that if both operands are integers, it will perform integer division and the result will be an integer.

```cpp
int quotient = a / b; // integer division
float quotient = float(a) / float(b); // floating-point division
```

## 5. Modulus Operator (`%`)

It calculates the remainder of an integer division.

```cpp
int remainder = a % b;
```

## 6. Increment Operator (`++`)

It increments the value of a variable by 1. There are two ways to use this operator: prefix (`++x`) and postfix (`x++`). Prefix increments the value before returning it, whereas postfix returns the value first and then increments it.

```cpp
int x = 5;
int y = ++x; // x = 6, y = 6
int z = x++; // x = 7, z = 6
```

## 7. Decrement Operator (`--`)

It decrements the value of a variable by 1. It can also be used in prefix (`--x`) and postfix (`x--`) forms.

```cpp
int x = 5;
int y = --x; // x = 4, y = 4
int z = x--; // x = 3, z = 4
```

These are the basic arithmetic operators in C++ that allow you to perform mathematical operations on your variables. Use them in combination with other control structures, such as loops and conditionals, to build more complex programs.
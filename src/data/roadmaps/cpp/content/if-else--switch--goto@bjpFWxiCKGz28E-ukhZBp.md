# Control Flow in C++: Conditionals (If/Else, Switch) and Goto

Conditionals are essential for controlling program flow by making decisions based on specific conditions. C++ provides several control flow mechanisms, including `if/else`, `switch`, and (though not recommended) `goto`.

## 1. Conditional Statements

Conditional statements rely on comparison operators:
[@article@Comparison Operators](https://en.cppreference.com/w/cpp/language/operator_comparison)

In C++, you can combine multiple conditions using logical operators like `&&` (AND), `||` (OR). You can also use the keywords `and` and `or`. However, `&&` and `||` are the standard operators.

### 1.1 If, Else If, Else
#### Syntax
```cpp
if (condition1) {
    // Executes if condition1 is true
} else if (condition2) {
    // Executes if condition1 is false and condition2 is true
} else {
    // Executes if both condition1 and condition2 are false
}
```
#### Example:
```cpp
int a = 5, b = 10, c = 3;
if (a < b && b > c) {
    std::cout << "Both conditions are true!" << std::endl;
} else if (b == c) {
    std::cout << "b is equal to c" << std::endl;
} else {
    std::cout << "None of the conditions are true!" << std::endl;
}
```

### 1.2 Ternary Operator

The ternary operator is a shorthand way of writing an `if-else` statement. It can replace multiple lines of code with a single line and is commonly used to simplify `if-else` statements.

#### Syntax
```cpp
variable = (condition) ? expressionTrue : expressionFalse;
```
Example:
```cpp
string result = (grade >= 50) ? "passed" : "failed";
```
### 2.1 Switch Case

The `switch` statement provides a way to select one of many code blocks to be executed based on the value of a variable. It's often more efficient than using a series of `if-else` statements when you have many possible values to check.
#### Syntax
```cpp
switch (expression) {
    case value1:
        // block of code if expression == value1
        break;
    case value2:
        // block of code if expression == value2
        break;
    // more cases can be added
    default:
        // block of code if expression doesn't match any case
}
```
**Important!**
The `break` statement is essential because it stops the program from executing the code in the following cases after a match is found. Without it, the program will "fall through" and execute the code in the next case(s), even if they don't match the expression.

#### Example:
```cpp
int day = 6;
switch (day) {
  case 6:
    std::cout << "Saturday" << std::endl;
    break; // without this 'break' the program would output "Saturday" and "Sunday"
  case 7:
    std::cout << "Sunday" << std::endl;
    break;
  default:
    std::cout << "Weekday" << std::endl;
}
```
## 2. Goto
The goto statement provides an unconditional jump to another part of the program.

#### Syntax
The goto statement is used with a label, and it jumps to that label in the code.
```cpp
goto label;
...
label:
    // code to execute after jump
```
#### Dangers of Goto
While `goto` can be useful in very specific situations, its overuse can make your code harder to follow, debug, and maintain. It can lead to "spaghetti code," where the control flow jumps around unpredictably. It's generally recommended to use structured control flow statements like `if`, `switch`, and `loops` instead of `goto`.

Learn more from the following resources:
- [@article@If... else](https://www.w3schools.com/cpp/cpp_conditions.asp)
- [@article@Switch case](https://www.w3schools.com/cpp/cpp_switch.asp)
- [@article@Goto](https://www.geeksforgeeks.org/goto-statement-in-cpp/)

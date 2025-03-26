# Control Flow & Statements
Control flow & statements provides the ability to make decision which part of code should be executed or not based on certain conditions(also called decision control statements). In C++, the different types of control statements are:

Basic:
  1. if statement
  2. if else statement
  3. if else if statement
  4. nested if statement
  5. switch statement

Advanced:

  6. ternary operator
  7. Jump statement

  ## Example if statement
  Simplest way to check weather a conditon is true or false and make a decision.

```cpp
  //Syntax

  if(condition_to_be_evaluated){
  //code to be executed when condition evaluates to true.
  // this section will only execute if specified condition is
  // met. Else it won't.
  }

```
  ```cpp
     int age = 19;
     // check if age is greater than 19.
     if(age > 18) {
      std::cout << "You are eligible to vote" << std::endl;
     }
```
Note: You can skip to write curly brasses if there is only one statement.
```cpp
    int age = 19;
    if (age > 18)
        cout << "allowed to vote";
    return 0;
```
To read more in depth about control statements. Check this out: https://www.geeksforgeeks.org/cpp-decision-making/

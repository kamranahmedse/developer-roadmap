# If-Else / Switch / Goto

C++ provides you with tools which helps you to control the way your program behaves (logic flows) based on how the user interact with your program. Here we will discuss about `if-else`, `switch` and `goto` are three common ways to guide the flow of logic in your code.

## if-else

Used to execute a block of code only if a certain condition is met

**syntax**

```cpp
if(/*condition*/){
//block of code
}
// else is executed when if Statement is false adding else with if is optional
else{
//block of code
}
```

if you want to check multiple conditions in a particular sequence you can use `else if` like this for example

```cpp
#include<iostream>
int main (){
  std::cout << "Enter a number: ";
  std::cin >> number;

  if (number > 0) {
      std::cout << "The number is positive." << std::endl;
  } else if (number < 0) {
      std::cout << "The number is negative." << std::endl;
  } else {
      std::cout << "The number is zero." << std::endl;
  }

  return 0;
}
```

## switch:
When we need to compare a single variable against multiple constant values, a switch statement can be used instead of multiple `if-else` blocks.

**syntax**
```cpp
#include <iostream>

int main() {
    int choice;

    std::cout << "Enter a number (1-3): ";
    std::cin >> choice;

    switch (choice) {
        case 1:
            std::cout << "You chose One." << std::endl;
            break;
        case 2:
            std::cout << "You chose Two." << std::endl;
            break;
        case 3:
            std::cout << "You chose Three." << std::endl;
            break;
        default:
            std::cout << "Invalid choice." << std::endl;
    }

    return 0;
}
```
## Goto
`goto` is a low-level control flow feature that allows unconditional jumps to a labeled part of the code. While it can be useful in specific scenarios, especially for breaking out of deeply nested loops or handling errors in C, it often leads to confusing and hard-to-maintain code if not used carefully.

**syntax**
```cpp
#include <iostream>

int main() {
    std::cout << "Before goto\n";

    goto skip;

    std::cout << "This will be skipped\n";

skip:
    std::cout << "After label\n";

    return 0;
}
/* 
  Output:
  Before goto
  After label
*/
```
Visit the following resources to learn more:

- [@video@The 'if-else' Statement in C++](https://www.youtube.com/watch?v=9-BjXs1vMSc)
- [@video@Learn C++ With Me - Switch Statement](https://www.youtube.com/watch?v=uOlLs1OYSSI)
- [@video@ why is it illegal to use "goto"?](https://youtu.be/AKJhThyTmQw?si=gjEqAsDZVMDGVAT2)
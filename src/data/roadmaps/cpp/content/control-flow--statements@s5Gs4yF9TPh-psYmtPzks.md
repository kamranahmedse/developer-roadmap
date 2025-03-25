# Control Flow & Statements
Control flow & statements provides the ability to make decision which part of code should be executed or not based on certain conditions(also called decision control statements). In C++, the different types of control statements are:
  
  ## 1. if
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

 ## 2. if else:
 When if condition is not evualuated true and you still want to execute some code, then if-else is used.
 ```cpp
  //Syntax
  
  if(condition_to_be_evaluated){
  //code to be executed when condition evaluates to true.
  // this section will only execute if specified condition is
  // met. Else it won't.
  } else {
  // code to be excuted only when if does not
  // match to specified condition.
}

```
 ```cpp
     int age = 10;
     // check if age is greater than 19.
     if(age > 18) {
      std::cout << "You are eligible to vote" << std::endl;
     } else {
    std::cout << "Not eligible to vote" << std::endl;
  }
```
 
  ## 3. Switch:
     
```cpp
  //Syntax
  
  switch(expression_to_be_compared){
    case 'Value_A':
    std::cout << "Value is A" <<std::endl;
    break;
    case 'Value_B':
    std::cout << "Value is B" <<std::endl;
    break;

    default:
    // to be excuted when no case is matched.
    std::cout << "No match or invalid expression" <<std::endl;
    break;
    // NOTE: break keyword is used so that program execution is stopped weather a case
    //matches or not.
  }

```
## 4. Ternary Operator: 
 Ternary operator also known as conditonal operator is used to write conditonal operations in C++.
 The '?' operator checks the given condition, if true then first expression is executed before  ':' otherwise second expression is executed after ':'.
Similar to if else but one liner.

```cpp
int a = 1, b = 2;
int ans;

max = (a > b) ? a : b;
std::cout << max;
```

To read more in depth about control statements such as if else if ladder , Nested if, Jump, goto, break. Check this out: https://www.geeksforgeeks.org/cpp-decision-making/

# Conditional Statements in Linux Shell Scripting

Conditional statements in Linux shell scripting allow scripts to make decisions based on specific conditions. These are fundamental constructs in any programming language, and the Linux shell is no exception. The shell provides conditional statements such as `if`, `elif` (else if), and `else` to control the flow of execution based on the results of conditional tests.

These conditional tests can evaluate the value of string variables, perform arithmetic operations, or check the status of a process. Here's a simple example using the `if-elif-else` construct in a Bash script on Ubuntu Linux:

```bash
#!/bin/bash

a=10
b=20

if [ $a -lt $b ]; then
    echo "Variable 'a' is less than variable 'b'"
elif [ $a -gt $b ]; then
    echo "Variable 'a' is greater than variable 'b'"
else
    echo "Variable 'a' is equal to variable 'b'"
fi
```

In this script, the first `if` condition checks if the value of `a` is less than the value of `b`. If this condition is true, the code block inside the `if` statement is executed, and the script prints "Variable 'a' is less than variable 'b'".

If the first condition is false, the script moves to the `elif` condition, which checks if the value of `a` is greater than the value of `b`. If this condition is true, the code block inside the `elif` statement is executed, and the script prints "Variable 'a' is greater than variable 'b'".

If both the `if` and `elif` conditions are false, the script executes the code block inside the `else` statement, and the script prints "Variable 'a' is equal to variable 'b'".

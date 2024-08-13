# Conditionals in Shell Programming

Conditional statements in Linux Shell Programming allow scripts to make decisions based on conditions. These are integral part of any programming language and just like other languages such as C, Python, JavaScript, Linux Shell also provides conditional statements. A conditional statement can be defined as an integral part of the shell script which guides the interpreter into the correct path of execution depending on the given conditions.

# If-statements

In shell, the main commands that are used for conditionals statements are `if`, `elif` (else if), and `else`. These commands are used for process control based on the results of conditional tests which can evaluate the value of string variables, arithmetic tests, or the status of a process.

Here's a simple illustration of how they work:

```bash
#!/bin/sh
a=10
b=20

if [ $a -lt 20 ]
then
   echo "a is less than b"
elif [ $a -gt 20 ]
then
   echo "a is greater than b"
else
   echo "a is equal to b"
fi
```

In the above script, the condition inside the `if` statement is being checked. If the condition is `true`, then the code block inside the `if` statement gets executed, otherwise, it moves to the `elif` condition and so on. If none of those conditions is satisfied, then the code block inside the `else` statement will be executed.

# Case-statements

Another conditional statement is the Case- or Switch-statement. A `case` statement is used when you need to compare a single variable against multiple possible values, especially when there are several conditions to check, making it more readable and efficient than multiple `if-elif-else` statements.

```bash
#!/bin/bash

choice="a"

case $choice in
    "a")
        echo "You selected Bash."
        ;;
    "b")
        echo "You selected Python."
        ;;
    "c")
        echo "You selected Java."
        ;;
    *)
        echo "Invalid choice."
        exit 1
        ;;
esac
```

Here the output would be `'You selected Bash.'` because the variable is `a`.

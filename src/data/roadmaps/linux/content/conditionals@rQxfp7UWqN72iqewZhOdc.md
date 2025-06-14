# Conditionals

Shell conditionals allow scripts to make decisions based on conditions using `if`, `elif`, and `else` statements. These control process flow by evaluating string variables, arithmetic tests, or process status. Conditions are checked sequentially - if true, the corresponding code block executes; otherwise, it moves to the next condition until finding a match or reaching `else`.

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
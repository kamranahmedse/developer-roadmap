# Variables in Shell Programming on Linux

In the context of Shell Programming on Linux, a variable is a character string that can store system data or user-defined data. It is a symbolic name that is assigned to an amount of storage space that can change its value during the execution of the program. Variables play a vital role in any programming paradigm, and shell scripting is no different.

Variables fall into two broad categories: **System Variables** and **User-Defined Variables**. System variables are created and maintained by the Linux system itself. Examples include PATH, HOME, and PWD. User-defined variables, on the other hand, are created and controlled by the user.

A variable in shell scripting is defined by the '=' (equals) operator, and the value can be retrieved by prefixing the variable name with a '$' (dollar) sign.

```bash
# Create a User-Defined Variable
MY_VARIABLE="Hello World"

# Print the value of the Variable
echo $MY_VARIABLE  # Output: Hello World
```
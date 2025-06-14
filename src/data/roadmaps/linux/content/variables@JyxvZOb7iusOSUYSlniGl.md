# Variables

Shell variables store system or user-defined data that can change during script execution. Two categories exist: System Variables (PATH, HOME, PWD) created by Linux, and User-Defined Variables created by users. Define variables with `=` operator and retrieve values with `$` prefix. Example: `MY_VARIABLE="Hello World"` then `echo $MY_VARIABLE` prints the value.

```bash
# Create a User-Defined Variable
MY_VARIABLE="Hello World"

# Print the value of the Variable
echo $MY_VARIABLE  # Output: Hello World
```
# Initialization

Initialization is giving a variable its first value at the point it is created, as in `int count = 0;`. Uninitialized local variables in C hold indeterminate values, whatever bits happened to be in that memory location before, so reading one before assigning it produces undefined behavior. Global and static variables are automatically initialized to zero if no explicit value is given, but local variables are not.

Visit the following resources to learn more:

- [@article@C - Variables](https://www.tutorialspoint.com/cprogramming/c_variables.htm)
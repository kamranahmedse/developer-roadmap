# Pointer Arithmetic

Pointer arithmetic lets you add or subtract integers from a pointer to move it to a different memory location, with the step size automatically scaled by the size of the type the pointer points to. This is the mechanism behind array indexing, since `arr[i]` is equivalent to `*(arr + i)`. Moving a pointer outside the bounds of the array or object it refers to, then dereferencing it, results in undefined behavior.

Visit the following resources to learn more:

- [@article@C Pointer Arithmetic](https://www.w3schools.com/c/c_pointers_arithmetic.php)
- [@article@Pointer Arithmetics in C](https://www.tutorialspoint.com/cprogramming/c_pointer_arithmetic.htm)
- [@video@Pointer Arithmetic (Increment & Decrement)](https://www.youtube.com/watch?v=gwqbYnxQGR8)
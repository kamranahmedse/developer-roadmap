# Function pointers & Callbacks

A function pointer stores the address of a function, allowing that function to be called indirectly, passed as an argument, or stored in a data structure, similar to how a regular pointer stores the address of a variable. Callbacks use this to let one function invoke another that is decided at runtime, a pattern used by standard library functions like `qsort`, which takes a comparison function as a callback. This mechanism underlies more advanced patterns in C, including simulating object-oriented dispatch through structs containing function pointers.

Visit the following resources to learn more:

- [@article@Function Pointers](https://www.w3schools.com/c/c_functions_pointers.php)
- [@article@Making Function Pointers Usable In C](https://vandervoord.net/blog/2015/6/2/making-function-pointers-usable-in-c)
- [@video@Function Pointers in C](https://www.youtube.com/watch?v=BRsv3ZXoHto)
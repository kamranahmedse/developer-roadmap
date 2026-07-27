# Error Handling

C has no built-in exception mechanism like some other languages, so error handling relies on conventions such as checking return values, setting the global `errno` variable, and in some cases using program termination through exit codes. This puts more responsibility on the programmer to consistently check for and respond to failure conditions. Non-local jumps with `setjmp`/`longjmp` provide a limited alternative for handling certain error scenarios that need to unwind multiple function calls at once.

Visit the following resources to learn more:

- [@article@C Error Handling](https://www.w3schools.com/c/c_error_handling.php)
- [@article@The different ways to handle errors in C](https://mccue.dev/pages/7-27-22-c-errors)
- [@video@Error Handling | C Programming Tutorial](https://www.youtube.com/watch?v=OOuZLI5ingc)
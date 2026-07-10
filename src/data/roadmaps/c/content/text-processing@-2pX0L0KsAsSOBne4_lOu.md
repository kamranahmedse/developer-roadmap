# Text Processing

Text processing functions, mostly from `<string.h>` and `<ctype.h>`, handle operations on C strings and characters, such as measuring length (`strlen`), copying (`strcpy`), concatenating (`strcat`), comparing (`strcmp`), and classifying individual characters as alphabetic, numeric, or whitespace. Many of these functions assume null-terminated strings and do not check buffer sizes, so using safer, bounded variants where available reduces the risk of buffer overflows. They form the core toolkit for any program that manipulates text.

Visit the following resources to learn more:

- [@article@C string (string.h) Library](https://www.w3schools.com/c/c_ref_string.php)
- [@article@C String Functions](https://www.w3schools.com/c/c_strings_functions.php)
- [@article@C Programming Strings](https://www.programiz.com/c-programming/c-strings)
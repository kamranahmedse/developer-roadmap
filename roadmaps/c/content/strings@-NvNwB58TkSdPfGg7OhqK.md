# Strings

C represents strings as arrays of `char` terminated by a null character (`\0`), rather than as a distinct string type. Because of this, string handling relies on knowing exactly where the null terminator is, and functions like `strlen`, `strcpy`, and `strcmp` from `<string.h>` operate on this convention. Forgetting to account for the null terminator's extra byte, or copying a string into a buffer too small to hold it, are frequent sources of bugs.

Visit the following resources to learn more:

- [@article@C Strings](https://www.w3schools.com/c/c_strings.php)
- [@article@C/Strings](https://www.cs.yale.edu/homes/aspnes/pinewiki/C(2f)Strings.html)
- [@video@String Basics | C Programming Tutorial](https://www.youtube.com/watch?v=60OI5tzmkCw)
- [@video@String In Char Array VS. Pointer To String Literal](https://www.youtube.com/watch?v=Qp3WatLL_Hc)
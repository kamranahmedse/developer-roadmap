# static

At file scope, `static` gives a variable or function internal linkage, restricting its visibility to the file it is defined in and preventing naming conflicts with other files. Inside a function, `static` on a local variable makes it retain its value between function calls instead of being reinitialized each time, while still keeping it local to that function. These two uses of `static` control different things, visibility versus lifetime, depending on where the keyword appears.

Visit the following resources to learn more:

- [@article@C static Keyword](https://www.w3schools.com/c/ref_keyword_static.php)
- [@video@The Static Keyword in C](https://www.youtube.com/watch?v=3E-r4GfvWOI)
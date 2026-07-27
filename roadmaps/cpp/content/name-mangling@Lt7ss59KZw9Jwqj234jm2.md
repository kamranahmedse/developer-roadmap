# Name Mangling

Name mangling, also known as name decoration, is a technique compilers use to encode extra information like scope, type, and linkage into identifier names (like function and variable names). This allows C++ to support function overloading, where multiple functions can share the same name but have different parameters. The compiler generates a mangled name based on these details, though the exact mangling rules vary between compilers and platforms. Tools like `c++filt` can demangle these names back to their original form, which is useful for debugging. While you usually don't need to understand the details of name mangling, it can be important when working with external libraries or linking object files from different compilers.

Visit the following resources to learn more:

- [@article@C++ Name Mangling](https://medium.com/@abhishek.ec/c-name-mangling-ce3d0fedf88d)
- [@video@Name Mangling In C++](https://www.youtube.com/watch?v=FUIle4Ghasw)
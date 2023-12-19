# Debugger Symbols

Debugger symbols are additional information embedded within the compiled program's binary code, that help debuggers in understanding the structure, source code, and variable representations at a particular point in the execution process.

There are generally two types of debugging symbols:

- **Internal Debugging Symbols**: These symbols reside within the compiled binary code itself. When using internal debugging symbols, it is essential to note that the size of the binary increases, which may not be desirable for production environments.

- **External Debugging Symbols**: The debugging symbols are kept in separate files apart from the binary code, usually with file extensions such as `.pdb` (Program Database) in Windows or `.dSYM` (DWARF Symbol Information) in macOS.

## Generating Debugger Symbols

To generate debugger symbols in C++, you need to specify specific options during the compilation process. We will use `g++` compiler as an example.

**Internal Debugging Symbols (g++)**

To create a debug build with internal debugging symbols, use the `-g` flag:

```bash
g++ -g -o my_program my_program.cpp
```

This command compiles `my_program.cpp` into an executable named `my_program` with internal debugging symbols.

**External Debugging Symbols (g++)**

In case you want to generate a separate file containing debugging symbols, you can use the `-gsplit-dwarf` flag:

```bash
g++ -g -gsplit-dwarf -o my_program my_program.cpp
```

This command compiles `my_program.cpp` into an executable named `my_program` and generates a separate file named `my_program.dwo` containing the debugging symbols.

When sharing your compiled binary to end-users, you can remove the debugging symbols using the `strip` command:

```bash
strip --strip-debug my_program
```

This command removes internal debug symbols, resulting in a smaller binary size while keeping the `.dwo` file for debugging purposes when needed.

Remember that the availability and syntax of these options may vary between different compilers and platforms. Be sure to consult your compiler's documentation to ensure proper usage of the debugging options.
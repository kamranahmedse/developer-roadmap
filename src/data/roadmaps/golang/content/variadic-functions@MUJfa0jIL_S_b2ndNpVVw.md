# Variadic Functions

Functions accepting variable number of arguments of same type. Syntax: `func name(args ...Type)`. Arguments treated as slice inside function. Call with multiple args or slice with `...` operator. Common in functions like `fmt.Printf()` and `append()`.
# Multiple Return Values

Go functions can return multiple values, commonly used for returning result and error. Syntax: `func name() (Type1, Type2)`. Caller receives all returned values or uses blank identifier `_` to ignore unwanted values. Idiomatic for error handling pattern.
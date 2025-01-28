# Built-in Types

There are several built-in data types, including:

- int: used to store integers
- double: used to store floating-point numbers
- String: used to store text
- bool: used to store true or false values
- List: used to store ordered collections of objects
- Sets: used to store unordered collection of unique items
- Map: used to store unordered collections of key-value pairs

Additionally, there are other complex data types like dynamic, var, and Object in Dart programming language which is used in Flutter.

- dynamic: can identify the value that is provided on the right hand side. But will not be able to use additional builtin functions. **Example: dynamic number = 25; print(number.~~isEven~~);**
- var: var datatype can identical to dynamic but can use additional capabilities. Var is also called mutable, which can change. **Example: dynamic number = 25; print(number.isEven);**
- final: similar to var with all the additional capabilities, but the value can be assigned only once. Final assigns value at the run time. **Example: Can assign DateTime.now()**, not we can assign only once and we did that doesn't matter if it changes during the run time.
- const: similar to final, only difference is const assigs at the complie time. **Example: cannot assign DateTime.now();** since it is changing all the time and also fetching from the internet.

Visit the following resources to learn more:

- [@article@Built-in types](https://dart.dev/guides/language/language-tour#built-in-types)
- [@article@Overview of Built-in Types](https://dart.dev/guides/language/coming-from/js-to-dart#built-in-types)
- [@article@Collections | Dart](https://dart.dev/language/collections)

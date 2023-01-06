# Built in types

The Dart language has special support for the following:

- Numbers (int, double)
- Strings (String)
- Booleans (bool)
- Lists (List, also known as arrays)
- Sets (Set)
- Maps (Map)
- Runes (Runes; often replaced by the characters API)
- Symbols (Symbol)
- The value null (Null)

This support includes the ability to create objects using literals. For example, `'this is a string'` is a string literal, and `true` is a boolean literal.

Because every variable in Dart refers to an object—an instance of a class—you can usually use constructors to initialize variables. Some of the built-in types have their own constructors. For example, you can use the `Map()` constructor to create a map.

Some other types also have special roles in the Dart language:
- `Object`: The superclass of all Dart classes except `Null`.
- `Enum`: The superclass of all enums.
- `Future` and `Stream`: Used in asynchrony support.
- `Iterable`: Used in for-in loops and in synchronous generator functions.
- `Never`: Indicates that an expression can never successfully finish evaluating. Most often used for functions that always throw an exception.
- `dynamic`: Indicates that you want to disable static checking. Usually you should use `Object` or `Object?` instead.
- `void`: Indicates that a value is never used. Often used as a return type.

The `Object`, `Object?`, `Null`, and `Never` classes have special roles in the class hierarchy, as described in the top-and-bottom section of Understanding null safety.


Visit the following resources to learn more:

- [Built-in types](https://dart.dev/guides/language/language-tour#built-in-types)
- [Fluttering Dart: Built-In Data Types](https://levelup.gitconnected.com/fluttering-dart-9a3e74b0d9c5)

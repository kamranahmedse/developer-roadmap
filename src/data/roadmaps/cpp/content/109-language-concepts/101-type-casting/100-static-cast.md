# Static Cast

`static_cast` is one of the casting operators in C++ that allows you to convert between different data types, such as integer and float, or between pointer types. This type of cast performs a compile-time check and gives an error if there is no valid conversion possible between given types. `static_cast` is generally safer than C-style casts since it does not perform an unsafe reinterpretation of data and allows for better type checking.

## Syntax

The syntax for `static_cast` is as follows:

```cpp
static_cast<new_type>(expression)
```

## Examples

- Converting between basic data types:

```cpp
int i = 42;
float f = static_cast<float>(i); // Converts integer i to float f
```

- Casting pointers of different object types in an inheritance hierarchy:

```cpp
class Base { /* ... */ };
class Derived : public Base { /* ... */ };

Base *bPtr = new Derived;
Derived *dPtr = static_cast<Derived *>(bPtr); // Converts Base pointer bPtr to Derived pointer dPtr
```

- Converting an integer to an enumeration:

```cpp
enum Color { RED, GREEN, BLUE };
int value = 1;
Color color = static_cast<Color>(value); // Converts integer value to corresponding Color enumeration
```

Keep in mind that `static_cast` should be used with caution when casting pointers between different object types. If the original type of the pointer does not match the target type, the result of the cast can be incorrect or cause unexpected behavior.
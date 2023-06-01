# Forward Declaration

Forward declaration is a way of declaring a symbol (class, function, or variable) before defining it in the code. It helps the compiler understand the type, size, and existence of the symbol. This declaration is particularly useful when we have cyclic dependencies or to reduce compilation time by avoiding unnecessary header inclusions in the source file.

## Class Forward Declaration

To use a class type before it is defined, you can declare the class without defining its members, like this:

```cpp
class ClassA; // forward declaration
```

You can then use pointers or references to the class in your code before defining the class itself:

```cpp
void do_something (ClassA& obj);

class ClassB {
public:
    void another_function(ClassA& obj);
};
```

However, if you try to make an object of `ClassA` or call its member functions without defining the class, you will get a compilation error.

## Function Forward Declaration

Functions must be declared before using them, and a forward declaration can be used to declare a function without defining it:

```cpp
int add(int a, int b); // forward declaration

int main() {
    int result = add(2, 3);
    return 0;
}

int add(int a, int b) {
    return a + b;
}
```

## Enum and Typedef Forward Declaration

For `enum` and `typedef`, it is not possible to forward declare because they don't have separate declaration and definition stages.

Keep in mind that forward declarations should be used cautiously, as they can make the code more difficult to understand.
# const_cast

`const_cast` is a type of casting in C++ that allows you to remove or add constness to a variable. In other words, it enables you to modify a `const` or `volatile` object, or change a pointer or reference to a `const` or `volatile` type. This is useful in certain scenarios when you need to pass a `const` variable as an argument or when a function parameter requires a non-const type, but you want to make sure the variable remains constant throughout the code.

Keep in mind that using `const_cast` to modify a truly `const` variable can lead to undefined behavior, so it is best to use this feature only when absolutely necessary.

## Example

Here's a code example showing how to use `const_cast`:

```cpp
#include <cassert>
#include <iostream>

void modifyVariable(int* ptr) {
    *ptr = 42;
}

int main() {
    const int original_value = 10;
    int* non_const_value_ptr = const_cast<int*>(&original_value);
    std::cout << "Original value: " << original_value << std::endl;

    modifyVariable(non_const_value_ptr);
    std::cout << "Modified value: " << *non_const_value_ptr << ", original_value: " << original_value << std::endl;

    assert(non_const_value_ptr == &original_value);

    return 0;
}

```

In this example, we first create a `const` variable, `original_value`. Then we use `const_cast` to remove the constness of the variable and assign it to a non-const pointer, `non_const_value_ptr`. The `modifyVariable` function takes an `int*` as an argument and modifies the value pointed to by the pointer, which would not have been possible if we passed the original `const int` directly. Finally, we print the `original_value` and the `*non_const_value_ptr`, which shows that the value has been modified using `const_cast`.

Please note that this example comes with some risks, as it touches undefined behavior. */

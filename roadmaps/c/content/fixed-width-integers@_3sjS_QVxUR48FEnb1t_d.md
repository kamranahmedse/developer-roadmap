# Fixed-width integers

Fixed-width integer types, defined in `<stdint.h>`, such as `int32_t` or `uint8_t`, guarantee an exact bit width regardless of platform, unlike `int` or `long` whose sizes can vary. This makes them useful for writing portable code, especially in networking, file formats, and embedded systems where exact sizes matter. Using them avoids subtle bugs that arise from assuming a type's size without checking it.

Visit the following resources to learn more:

- [@article@C Fixed Width Integers](https://www.w3schools.com/c/c_fixed_width_ints.php)
- [@article@Fixed width integer types (since C99)](https://en.cppreference.com/c/types/integer)
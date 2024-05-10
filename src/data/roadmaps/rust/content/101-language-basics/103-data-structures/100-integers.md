# Integers

In Rust, integers are a primitive data type that hold whole number values, both positive and negative. Integer types in Rust can be divided into two subcategories: signed and unsigned. Signed integers are those that can hold negative, zero, and positive values whereas unsigned integers only hold zero and positive values. They are denoted by "i" and "u" respectively followed by a number which represents the number of bits they occupy in memory. The available integer types are `i8`, `i16`, `i32`, `i64`, `i128` and `isize` (signed), and `u8`, `u16`, `u32`, `u64`, `u128` and `usize` (unsigned). In these types, the number after "i" or "u" denotes the size of the integer type in bits. The `isize` and `usize` types depend on the kind of computer your program is running on: 64 bits on a 64-bit architecture and 32 bits on a 32-bit architecture.

Learn more from the following links:

- [Integer Types](https://rust-book.cs.brown.edu/ch03-02-data-types.html#integer-types)
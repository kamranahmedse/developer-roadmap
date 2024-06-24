# Integers

In Rust, integers are a primitive data type that hold whole number values, both positive and negative. Integer types in Rust can be divided into signed and unsigned ones:

- Signed integers, denoted by "i", are those that can hold negative, zero, and positive values.
- Unsigned integers, denoted by "u", only hold zero and positive values.

Each denotation is followed by a number which represents the number of bits they occupy in memory. The available integer types are:

|Type|Minimum|Maximum|
|---|---|---|
|i8|-(2^7)|(2^7)-1|
|i16|-(2^15)|(2^15)-1|
|i32|-(2^31)|(2^31)-1|
|i64|-(2^63)|(2^63)-1|
|i128|-(2^127)|(2^127)-1)
|isize|-(2^31) or -(2^63)|(2^31)-1 or (2^63)-1|

The unsigned integer types consist of:

|Type|Minimum|Maximum|
|---|---|---|
|u8|0|(2^8)-1|
|u16|0|(2^16)-1|
|u32|0|(2^32)-1|
|u64|0|(2^64)-1|
|u128|0|(2^128)-1|
|usize|0|(2^32)-1 or (2^64)-1|

In these types, the number after "i" or "u" denotes the size of the integer type in bits.

There's also the `isize` and `usize` integer types. The sizes of these primitive are taken from the computer architecture (32/64 bits). When one of these types is declared, the compiler calculates, so to speak, how many bytes it takes to reference any location in memory. For example, on a 32-bit target, this is 4 bytes, and on a 64-bit target, this is 8 bytes.

- [@article@Integer Data Type in Rust](https://doc.rust-lang.org/book/ch03-02-data-types.html#integer-types)

- [@article@Rust Data Types (With Examples)](https://www.programiz.com/rust/data-types#integer-type)

- [@article@Machine-dependent Integer Types](https://doc.rust-lang.org/reference/types/numeric.html#machine-dependent-integer-types)

Learn more from the following links:

- [@article@Integer Types](https://rust-book.cs.brown.edu/ch03-02-data-types.html#integer-types)

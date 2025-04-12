# Character

In Rust, the `char` keyword is used to denote a character type. A `char` in Rust represents a **Unicode Scalar Value**, which means it can represent a lot more than just ASCII. Accented letters, Chinese/Japanese/Korean ideographs, emoji, and zero width spaces are all valid `char` Types in Rust. It occupies in memory the same size of `u32` type, that's 4 bytes (or `32bit`) to store a single character. It is defined with single quotes like `let x: char = 'z';`.

Learn more from the following links:

- [@official@The char Primitive Type](https://doc.rust-lang.org/std/primitive.char.html)
- [@article@The Character Type](https://rust-book.cs.brown.edu/ch03-02-data-types.html#the-character-type)
- [@article@Unicode Glossary - Unicode Scalar Value](https://www.unicode.org/glossary/#unicode_scalar_value)
- [@video@Char Type in Rust](https://www.youtube.com/watch?v=NZaEinuVPVg&pp=ygURY2hhciB0eXBlIGluIHJ1c3Q%3D)

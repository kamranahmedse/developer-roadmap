# Floats

In Rust, `floats` are a primitive data types used to represent floating-point numbers. They are defined as numerical values with fractional components. Floating-point numbers are represented according to the IEEE-754 standard.

Rust supports two types of floating-point numbers: `f32` and `f64`. These are 32-bit and 64-bit in size, respectively.

- `f32` (_binary32_ type defined in IEEE-754-2008) is a single-precision float, which means is less precise than `f64` type.
- `f64` (_binary64_ type defined in IEEE-754-2008) has double precision. The default type is `f64` because on modern CPUs it’s roughly the same speed as `f32` but allows more precision.

Both `f32` and `f64` represent negative, zero and positive floating-point values.

Visit the following resources to learn more:

- [@official@f32](https://doc.rust-lang.org/std/primitive.f32.html)
- [@article@IEEE-754 Standard](https://en.wikipedia.org/wiki/IEEE_754)
- [@article@Floating-Point Types](https://rust-book.cs.brown.edu/ch03-02-data-types.html#floating-point-types)
- [@video@Rust Tutorial - Floating-Points](https://www.youtube.com/watch?v=t047Hseyj_k&t=335s)

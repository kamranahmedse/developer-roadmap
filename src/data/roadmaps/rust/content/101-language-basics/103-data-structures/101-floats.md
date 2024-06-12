# Floats

In Rust, `floats` is a primitive data type used to represent floating-point numbers. They are defined as numerical values with fractional components. Floating-point numbers are represented according to the IEEE-754 standard.

Rust supports two types of floating-point numbers: `f32` and `f64`. These are 32-bit and 64-bit in size, respectively.

- `f32` (_binary32_ type defined in IEEE-754-2008) is a single-precision float, which means is less precise than to `f64` type.
- `f64` (_binary64_ type defined in IEEE-754-2008) has double precision. The default type is `f64` because on modern CPUs it’s roughly the same speed as `f32` but allows more precision.

**IEEE-754-2008 definition of floating-point numbers in Rust**

|Rust Data Type|Name|Digits|Decimal Digits|
|:----:|:----:|:----:|:----:|
|`f32`|_binary32_|24|7.22|
|`f64`|_binary64_|53|15.95|

Both `f32` and `f64` represent negative, zero and positive floating-point values.

**Example**

```rust
fn main() {
    let x = 2.0; // f64 - default floating-point type

    let y: f32 = 3.0; // f32
}
```
Learn more from the following links:

- [@video@Rust Tutorial - Floating-Points](https://www.youtube.com/watch?v=t047Hseyj_k&t=335s)
- [@official@f32 - Rust](https://doc.rust-lang.org/std/primitive.f32.html)
- [@article@IEEE-754 Standard](https://en.wikipedia.org/wiki/IEEE_754)
- [@article@Floating-Point Types](https://rust-book.cs.brown.edu/ch03-02-data-types.html#floating-point-types)

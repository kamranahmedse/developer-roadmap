# Slice to Array Conversion

Convert slice to array using `[N]T(slice)` (Go 1.17+). Copies data from slice to fixed-size array. Panics if slice has fewer than N elements. Useful when array semantics or specific size guarantees are needed.

Visit the following resources to learn more:

- [@article@Slice Arrays Correctly](https://labex.io/tutorials/go-how-to-slice-arrays-correctly-418936)
- [@article@Go - Create Slice From Array - 3 Examples](https://www.tutorialkart.com/golang-tutorial/golang-create-slice-from-array/)
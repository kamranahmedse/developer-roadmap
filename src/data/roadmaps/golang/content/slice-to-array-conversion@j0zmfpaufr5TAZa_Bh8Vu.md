# Slice to Array Conversion

Convert slice to array using `[N]T(slice)` (Go 1.17+). Copies data from slice to fixed-size array. Panics if slice has fewer than N elements. Useful when array semantics or specific size guarantees are needed.
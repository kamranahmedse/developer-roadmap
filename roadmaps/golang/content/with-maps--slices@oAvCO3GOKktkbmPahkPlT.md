# Pointers with Maps & Slices

Maps and slices are reference types - passing them to functions doesn't copy underlying data. Modifications inside functions affect original. No need for explicit pointers. However, reassigning the slice/map variable itself won't affect caller unless using pointer.

Visit the following resources to learn more:

- [@official@Maps](https://go.dev/blog/maps)
- [@official@Pointers](https://go.dev/tour/moretypes/1)
- [@article@Slice Arrays Correctly](https://labex.io/tutorials/go-how-to-slice-arrays-correctly-418936)

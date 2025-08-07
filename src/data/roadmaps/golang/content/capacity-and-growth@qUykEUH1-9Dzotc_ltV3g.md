# Capacity and Growth

Slice capacity determines when reallocation occurs during append operations. Go typically doubles capacity for smaller slices. Pre-allocate with `make([]T, length, capacity)` to optimize memory usage and minimize allocations in performance-critical code.

Visit the following resources to learn more:

- [@article@Understanding Go's Slice Data Structure and Its Growth Pattern](https://medium.com/@arjun.devb25/understanding-gos-slice-data-structure-and-its-growth-pattern-48fe6dd914b4)
- [@article@How to Increase Slice Capacity in Go](https://thekoreanguy.medium.com/how-does-the-capacity-change-when-you-append-to-a-slice-in-go-46289dad4730)
- [@article@How to Manage Slice Length and Capacity](https://labex.io/tutorials/go-how-to-manage-slice-length-and-capacity-418932)
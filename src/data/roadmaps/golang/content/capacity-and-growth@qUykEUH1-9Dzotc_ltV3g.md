# Capacity and Growth

Slice capacity determines when reallocation occurs during append operations. Go typically doubles capacity for smaller slices. Pre-allocate with `make([]T, length, capacity)` to optimize memory usage and minimize allocations in performance-critical code.
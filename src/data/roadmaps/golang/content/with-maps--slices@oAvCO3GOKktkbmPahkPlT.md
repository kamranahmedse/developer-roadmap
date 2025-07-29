# Pointers with Maps & Slices

Maps and slices are reference types - passing them to functions doesn't copy underlying data. Modifications inside functions affect original. No need for explicit pointers. However, reassigning the slice/map variable itself won't affect caller unless using pointer.
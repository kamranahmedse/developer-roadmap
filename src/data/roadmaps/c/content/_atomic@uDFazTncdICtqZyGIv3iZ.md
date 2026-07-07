# _Atomic
 
The `_Atomic` qualifier, introduced in C11, marks a variable so that reads and writes to it happen as a single, indivisible operation, even when accessed from multiple threads. This prevents data races on that variable without needing a separate lock. It is used together with the `<stdatomic.h>` header when writing concurrent C code.
# booleans
 
C did not originally have a dedicated boolean type, relying instead on the convention that zero means false and any nonzero value means true. Since C99, the `<stdbool.h>` header provides a `bool` type along with `true` and `false` macros for clearer code. Under the hood, `bool` is still typically implemented as a small integer type.
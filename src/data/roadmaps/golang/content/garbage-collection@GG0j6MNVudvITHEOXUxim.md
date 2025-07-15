# Garbage Collection

Go's GC automatically reclaims unreachable memory using concurrent, tri-color mark-and-sweep collector designed for minimal pause times. Runs concurrently with your program. Understanding GC helps write efficient programs that work well with automatic memory management.
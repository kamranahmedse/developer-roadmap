# POSIX Threads

POSIX Threads, commonly called pthreads, is a standardized API, defined in `<pthread.h>`, for creating and managing threads on Unix-like systems, letting a single process run multiple sequences of instructions concurrently. Threads created this way share the same memory space, which enables fast communication between them but also introduces the risk of race conditions when multiple threads access the same data without coordination. Functions like `pthread_create` and `pthread_join` handle starting new threads and waiting for them to finish.

Visit the following resources to learn more:

- [@article@POSIX thread (pthread) libraries](https://www.cs.cmu.edu/afs/cs/academic/class/15492-f07/www/pthreads.html)
- [@article@POSIX Threads (pthreads) — The Simplest Way to Understand Real Multithreading in C](https://medium.com/@techdhaba.training/posix-threads-pthreads-the-simplest-way-to-understand-real-multithreading-in-c-c2f591ab7a03)
- [@video@How to create and join threads in C (pthreads).](https://www.youtube.com/watch?v=uA8X5zNOGw8)
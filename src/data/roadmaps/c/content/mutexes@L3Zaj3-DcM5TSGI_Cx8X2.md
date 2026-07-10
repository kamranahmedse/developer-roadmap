# Mutexes

A mutex (mutual exclusion lock) is a synchronization primitive that ensures only one thread can access a shared resource, like a variable or data structure, at a time, preventing race conditions. A thread acquires (locks) the mutex before accessing the shared resource and releases (unlocks) it afterward, and any other thread attempting to lock it in the meantime must wait. Forgetting to unlock a mutex, or locking the same mutex twice from the same thread without releasing it first, can cause a program to deadlock, freezing indefinitely.

Visit the following resources to learn more:

- [@article@Threads, Mutexes and Concurrent Programming in C](https://www.codequoi.com/en/threads-mutexes-and-concurrent-programming-in-c/)
- [@article@Using mutexes](https://www.ibm.com/docs/en/aix/7.1.0?topic=programming-using-mutexes)
- [@video@Mutex Introduction (pthreads) | C Programming Tutorial](https://www.youtube.com/watch?v=raLCgPK-Igc)
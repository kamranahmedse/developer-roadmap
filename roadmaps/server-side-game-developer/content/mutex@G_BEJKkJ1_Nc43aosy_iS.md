# Mutex

`Mutex`, short for mutual exclusion, is a synchronization method used by developers to prevent multiple threads from concurrently accessing some shared resource or part of code. It is a locking mechanism that enforces limits to ensure that only one thread can perform certain operations at a time. If a `mutex` is locked by one thread, the other threads trying to lock it will be blocked until the owner thread unlocks it. This tool is essential especially in multi-threaded programming environments to avoid conditions like race conditions where the program's behavior may depend on the sequence of scheduling or timings of the threads.
Visit the following resources to learn more:

- [@article@Mutex Objects - Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/sync/mutex-objects)
- [@article@Synchronization - CS 341](https://cs341.cs.illinois.edu/coursebook/Synchronization)
- [@official@Using mutexes - IBM](https://www.ibm.com/docs/en/aix/7.1.0?topic=programming-using-mutexes)

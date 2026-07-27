# Concurrency

Concurrency in C covers running multiple sequences of execution, such as threads or processes, at the same time or in an interleaved fashion. This includes using POSIX threads for shared-memory parallelism within a single process, mutexes to prevent multiple threads from corrupting shared data, and inter-process communication for separate processes that need to exchange data. Writing correct concurrent C code requires careful attention to shared state, since the language provides no automatic protection against data races.

Visit the following resources to learn more:

- [@book@Introduction to Concurrent Programming in C](https://storm-lang.org/progvis-book/book.pdf)
- [@article@Threads, Mutexes and Concurrent Programming in C](https://www.codequoi.com/en/threads-mutexes-and-concurrent-programming-in-c/)
- [@article@Concurrency in C](https://www.classes.cs.uchicago.edu/archive/2017/spring/12300-1/lab5.html)
- [@video@Introduction To Threads (pthreads) | C Programming Tutorial](https://www.youtube.com/watch?v=ldJ8WGZVXZk)
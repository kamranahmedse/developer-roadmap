# Mutexes

Mutual exclusion locks from sync package ensuring only one goroutine accesses shared resource at a time. Use `Lock()` before and `Unlock()` after critical section. RWMutex allows multiple readers or single writer. Essential for protecting shared data from race conditions.

Visit the following resources to learn more:

- [@article@What is Mutex and How to Use it in Golang?](https://dev.to/lincemathew/what-is-mutex-and-how-to-use-it-in-golang-1m1i)
- [@article@Understanding Mutex in Go Introduction](https://kamnagarg-10157.medium.com/understanding-mutex-in-go-5f41199085b9)
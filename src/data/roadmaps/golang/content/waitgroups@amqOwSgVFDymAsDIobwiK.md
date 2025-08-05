# WaitGroups

Synchronization primitive from sync package for waiting on multiple goroutines to complete. Use `Add()` to increment counter, `Done()` when goroutine finishes, `Wait()` to block until counter reaches zero. Essential for coordinating goroutine completion in concurrent programs.

Visit the following resources to learn more:

- [@article@WaitGroup in Go - How and when to use WaitGroup](https://medium.com/@dmytro.misik/waitgroup-in-go-df8f068e646f)
- [@article@Mastering Concurrency in Golang](https://thelinuxcode.com/mastering-concurrency-in-golang-a-deep-dive-into-the-waitgroup/)

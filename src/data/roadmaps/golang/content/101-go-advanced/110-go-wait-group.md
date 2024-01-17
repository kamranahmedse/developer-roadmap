# WaitGroups

A WaitGroup waits for a collection of goroutines to finish. The main goroutine calls **Add** to set the number of goroutines to wait for. Then each of the goroutines runs and calls **Done** when finished. At the same time, **Wait** can be used to block until all goroutines have finished. It's part of the __sync__ package.

Visit the following resources to learn more:

- [Using a WaitGroup in Go by Example](https://gobyexample.com/waitgroups)
- [Using WaitGroups in Golang](https://www.geeksforgeeks.org/using-waitgroup-in-golang/)
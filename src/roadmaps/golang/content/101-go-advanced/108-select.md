# Select

The `select` statement lets a goroutine wait on multiple communication operations.

A `select` blocks until one of its cases can run, then it executes that case. It chooses one at random if multiple are ready. The `select` statement is just like switch statement, but in the select statement, case statement refers to communication, i.e. sent or receive operation on the channel.

- [Select](https://go.dev/tour/concurrency/5)
- [Go by Example: Select](https://gobyexample.com/select)
- [Select in Golang](https://www.geeksforgeeks.org/select-statement-in-go-language/)
- [Select Statement](https://www.youtube.com/watch?v=1c7ttSJDMAI)

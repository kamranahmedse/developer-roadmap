# `panic` and `recover`

`panic()` stops execution and unwinds stack, `recover()` catches panics in deferred functions. Use sparingly for unrecoverable errors. While Go emphasizes explicit errors, panic/recover serve as safety net for exceptional situations.

Visit the following resources to learn more:

- [@official@Defer, Panic, and Recover](https://go.dev/blog/defer-panic-and-recover)
- [@article@Handling Panics in Go](https://www.digitalocean.com/community/tutorials/handling-panics-in-go)
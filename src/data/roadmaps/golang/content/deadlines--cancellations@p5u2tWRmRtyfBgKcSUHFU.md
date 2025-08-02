# Deadlines & Cancellations

Context package mechanisms for controlling operation lifetime and propagating cancellation signals. Supports deadlines (absolute time) or timeouts (duration). Functions should check `ctx.Done()` and return early when cancelled. Essential for robust concurrent applications.

Visit the following resources to learn more:

- [@official@Canceling in-progress Operations](https://go.dev/doc/database/cancel-operations)
- [@article@Understanding Golang Context: Cancellation, Timeouts](https://webdevstation.com/posts/understanding-golang-context/)
- [@article@Understanding Context in Golang](https://medium.com/better-programming/understanding-context-in-golang-7f574d9d94e0)
- [@article@How to use the context.Done\(\) method in Go](https://dev.to/mcaci/how-to-use-the-context-done-method-in-go-22me)
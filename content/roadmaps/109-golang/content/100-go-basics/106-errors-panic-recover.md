# Errors/Panic/Recover

In lieu of adding exception handlers, the Go creators exploited Go’s ability to return multiple values. The most commonly used Go technique for issuing errors is to return the error as the last value in a return.

A panic typically means something went unexpectedly wrong. Mostly used to fail fast on errors that shouldn’t occur during normal operation, or that we aren’t prepared to handle gracefully.

Panic recovery in Go depends on a feature of the language called deferred functions. Go has the ability to guarantee the execution of a function at the moment its parent function returns. This happens regardless of whether the reason for the parent function’s return is a return statement, the end of the function block, or a panic.

<ResourceGroupTitle>Free Content</ResourceGroupTitle>
<BadgeLink colorScheme='yellow' badgeText='Read' href='https://go.dev/blog/error-handling-and-go'>Error handling and Go</BadgeLink>
<BadgeLink colorScheme='yellow' badgeText='Read' href='https://go.dev/blog/defer-panic-and-recover'>Go Defer, Panic and Recover</BadgeLink>
<BadgeLink colorScheme='yellow' badgeText='Read' href='https://earthly.dev/blog/golang-errors/'>Effective error handling in Go</BadgeLink>

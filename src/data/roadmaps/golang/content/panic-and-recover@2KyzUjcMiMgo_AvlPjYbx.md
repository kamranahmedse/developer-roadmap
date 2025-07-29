# `panic` and `recover`

`panic()` stops execution and unwinds stack, `recover()` catches panics in deferred functions. Use sparingly for unrecoverable errors. While Go emphasizes explicit errors, panic/recover serve as safety net for exceptional situations.
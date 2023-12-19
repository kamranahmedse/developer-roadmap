# Futures and Async/Await Paradigm

Futures in Rust represent values that might not have been computed yet. They are a way for the program to describe an operation that will be completed at some point in the future, or will complete asynchronously. They are a cornerstone of many async applications in Rust. A Future is an asynchronous computation that can produce a value (Ok-type) or an error (Err-type). The critical idea behind futures is that they can produce their value at some point in time, that "sometime" can be now, in the future, or never.

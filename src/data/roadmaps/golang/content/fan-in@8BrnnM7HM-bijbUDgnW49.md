# Fan-in

Concurrency pattern merging multiple input channels into single output channel. Allows collecting results from multiple goroutines. Typically implemented with select statement or separate goroutines for each input. Useful for aggregating parallel processing results.

Visit the following resources to learn more:

- [@article@Fan Out Fan In Concurrency Pattern Explained](https://www.golinuxcloud.com/go-fan-out-fan-in/)
- [@article@Golang Concurrency Patterns: Fan in, Fan out](https://medium.com/geekculture/golang-concurrency-patterns-fan-in-fan-out-1ee43c6830c4)

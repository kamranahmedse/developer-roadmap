# Fan-out

Concurrency pattern distributing work from single source to multiple workers. Typically uses one input channel feeding multiple goroutines. Each worker processes items independently. Useful for parallelizing CPU-intensive tasks and increasing throughput through parallel processing.

Visit the following resources to learn more:

- [@article@Fan Out Fan In Concurrency Pattern Explained](https://www.golinuxcloud.com/go-fan-out-fan-in/)
- [@article@Golang Concurrency Patterns: Fan in, Fan out](https://medium.com/geekculture/golang-concurrency-patterns-fan-in-fan-out-1ee43c6830c4)

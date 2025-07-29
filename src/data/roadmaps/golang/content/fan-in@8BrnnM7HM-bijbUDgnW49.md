# Fan-in

Concurrency pattern merging multiple input channels into single output channel. Allows collecting results from multiple goroutines. Typically implemented with select statement or separate goroutines for each input. Useful for aggregating parallel processing results.
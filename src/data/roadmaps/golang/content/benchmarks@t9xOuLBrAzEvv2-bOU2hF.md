# Benchmarks

Benchmarks measure code performance by timing repeated executions. Functions start with `Benchmark` and use `*testing.B` parameter. Run with `go test -bench=.` to identify bottlenecks, compare implementations, and track performance changes over time.
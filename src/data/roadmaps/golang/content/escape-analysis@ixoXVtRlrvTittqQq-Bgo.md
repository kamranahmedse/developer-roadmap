# Escape Analysis

Compile-time optimization determining whether variables are allocated on stack (fast) or heap (GC required). Variables that "escape" their scope need heap allocation. Use `go build -gcflags="-m"` to view decisions. Understanding helps minimize heap allocations and reduce GC pressure.

Visit the following resources to learn more:

- [@article@Escape Analysis in Go: Stack vs Heap Allocation Explained](https://dev.to/abstractmusa/escape-analysis-in-go-stack-vs-heap-allocation-explained-506a)
- [@article@Escape Analysis in Golang](https://medium.com/@trinad536/escape-analysis-in-golang-fc81b78f3550)

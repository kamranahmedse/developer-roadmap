# Escape Analysis

Compile-time optimization determining whether variables are allocated on stack (fast) or heap (GC required). Variables that "escape" their scope need heap allocation. Use `go build -gcflags="-m"` to view decisions. Understanding helps minimize heap allocations and reduce GC pressure.
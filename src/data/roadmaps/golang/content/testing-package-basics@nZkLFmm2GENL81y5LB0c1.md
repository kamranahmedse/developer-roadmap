# Testing Package Basics

Standard library package for writing tests. Test functions start with `Test` and take `*testing.T` parameter. Use `t.Error()`, `t.Fatal()` for failures. Test files end with `_test.go`. Run with `go test`. Supports benchmarks and examples.
# Testing Package Basics

Standard library package for writing tests. Test functions start with `Test` and take `*testing.T` parameter. Use `t.Error()`, `t.Fatal()` for failures. Test files end with `_test.go`. Run with `go test`. Supports benchmarks and examples.

Visit the following resources to learn more:

- [@official@testing package](https://pkg.go.dev/testing)
- [@article@How to manage testing package setup](https://labex.io/tutorials/go-how-to-manage-testing-package-setup-451557)
- [@article@Go Unit Testing: A Practical Guide for Writing Reliable Tests](https://www.ceos3c.com/golang/go-unit-testing-a-practical-guide-for-writing-reliable-tests/)
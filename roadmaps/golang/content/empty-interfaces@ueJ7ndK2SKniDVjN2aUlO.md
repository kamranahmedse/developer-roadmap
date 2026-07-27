# Empty Interface

The empty interface `interface{}` can hold values of any type since every type implements at least zero methods. Used for generic programming before Go 1.18 generics. Requires type assertions or type switches to access underlying values. Common in APIs handling unknown data types.

Visit the following resources to learn more:

- [@article@Empty Interface](https://go.dev/tour/methods/14)
- [@article@Understanding the empty interface in Go](https://dev.to/flrnd/understanding-the-empty-interface-in-go-4652)
# Value Receivers

Methods receive copy of struct rather than pointer. Use `func (v Type) methodName()` syntax. Appropriate when method doesn't modify receiver or struct is small. Can be called on both values and pointers with Go automatically dereferencing.

Visit the following resources to learn more:

- [@official@Value Receivers](https://go.dev/tour/methods/8)
- [@article@Understanding Value and Pointer Receivers in Go Interfaces](https://afdz.medium.com/understanding-value-and-pointer-receivers-in-go-interfaces-e97a824fdded)
- [@article@Go Method Receivers: Understanding Value vs. Pointer and When to Use](https://blog.stackademic.com/go-method-receivers-understanding-value-vs-pointer-and-when-to-use-each-74ef82d66a5c)

# Pointer Receivers

Methods receive pointer to struct rather than copy using `func (p *Type) methodName()` syntax. Necessary when method modifies receiver state or struct is large. Go automatically handles value/pointer conversion when calling methods.

Visit the following resources to learn more:

- [@official@Pointer Receivers](https://go.dev/tour/methods/4)
- [@article@Understanding Value and Pointer Receivers in Golang](https://medium.com/the-bug-shots/understanding-value-and-pointer-receivers-in-golang-82dd73a3eef9)
- [@article@How to define methods with pointer receivers](https://labex.io/tutorials/go-how-to-define-methods-with-pointer-receivers-437937)
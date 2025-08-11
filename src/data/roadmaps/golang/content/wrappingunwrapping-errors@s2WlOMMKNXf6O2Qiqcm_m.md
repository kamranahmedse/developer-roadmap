# Wrapping/Unwrapping Errors

Create error chains preserving original errors while adding context using `fmt.Errorf()` with `%w` verb. Use `errors.Unwrap()`, `errors.Is()`, and `errors.As()` to work with wrapped errors. Enables rich error contexts for easier debugging.

Visit the following resources to learn more:

- [@article@Golang: error wrapping / unwrapping](https://medium.com/@vajahatkareem/golang-error-wrapping-multierror-759d04bdbfaf)
- [@article@Error Wrapping in Go - Go Error Handling Example](https://go-cookbook.com/snippets/error-handling/error-wrapping)

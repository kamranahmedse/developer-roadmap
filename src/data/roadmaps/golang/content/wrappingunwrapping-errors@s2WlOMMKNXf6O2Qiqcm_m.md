# Wrapping/Unwrapping Errors

Create error chains preserving original errors while adding context using `fmt.Errorf()` with `%w` verb. Use `errors.Unwrap()`, `errors.Is()`, and `errors.As()` to work with wrapped errors. Enables rich error contexts for easier debugging.
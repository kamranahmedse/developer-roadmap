# Error Handling Basics

Go uses explicit error handling with error return values. Functions return error as last value. Check `if err != nil` pattern. Create errors with `errors.New()` or `fmt.Errorf()`. No exceptions - errors are values to be handled explicitly.
Go's built in testing package simplifies writing unit tests for your Go code. 

By creating test functions with the prefix Test and using several values for expected results, you can verify that your code behaves as expected. 

Generally speaking, writing unit tests is crucial for code documentation and for ensuring that changes in one function don't affect the rest of the code.

Imagine having the following function:

```go
package math

// Add returns the sum of a and b.
func Add(a, b int) int {
    return a + b
}
```

Now, using the built-in testing package, you can write a unit test for this function like this:

```go
package math

import "testing"

func TestAdd(t *testing.T) {
    got := Add(2, 3)
    want := 5
    if got != want {
        t.Errorf("Add(2, 3) = %d; want %d", got, want)
    }
}
```

Simple, straightforward, and now the tests run through the go test command. 
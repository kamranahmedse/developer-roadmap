Calling a function in Go involves passing parameters to a function (by value, meaning that all values are copied in memory when passed to the function) and then executing its code. You can of course use pointers to share data "by reference" if you need to.

When the function is called, the runtime creates a new section of memory (a stack frame) to store these copied values along with any other information needed.

Once the function finishes executing, the runtime cleans up this memory (garbage collection) and returns control to the calling function.

Here's an example of how to call functions in Golang:

```go
package main

import "fmt"

func greet(name string) string {
    return "Hello, " + name + "!"
}

func main() {
    // Here we call the function.
    message := greet("Bob")
    fmt.Println(message)
}
``` 
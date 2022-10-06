# Select

The `select` statement is similar to a `case` statement, but is primarily used for handling reading from multiple channels.

```go
package main
 
import (
    "fmt"
)
 
func g1(ch chan int) {
    ch <- 12
}
 
func g2(ch chan int) {
    ch <- 32
}
 
func main() {
 
    ch1 := make(chan int)
    ch2 := make(chan int)
 
    go g1(ch1)
    go g1(ch2)
 
    select {
    case v1 := <-ch1:
        fmt.Println("Got: ", v1)
    case v2 := <-ch2:
        fmt.Println("Got: ", v2)
    }
}
```

In the above snippet two goroutines are attempting to write to two different channels.  The `select` statement allows us to read from whichever channel is available first.

For details see https://golangdocs.com/select-statement-in-golang

Composite data types in Go, like arrays, slices, maps, and structs, let you group values into a single structure. 

For example, the below code show how a struct can be used to process json data:

```go
package main

import "fmt"

// Define a composite data type using a struct
type Person struct {
    Name string
    Age  int 
}

func main() {
    // Create a new struct and print key value pairs
    person := Person{Name: "Alice", Age: 30}
    fmt.Println("Name:", person.Name, "Age:", person.Age)
}
``` 
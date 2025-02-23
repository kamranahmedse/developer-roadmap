# Type Casting

Go doesn't support automatic type conversion, but it allows type casting, which is the process of explicitly changing the variable type.

Creating variables that share same data, but with different types:
```go
var PI float32 = 3.14159
// var b int = PI // (compiler IncompatibleAssign error)
var b int = int(PI)
```
Same is true for expressions with different data types:
```go
var PI float32 = 3.14159
var times int = 32;
// c := (PI*times) // (compiler MismatchedTypes error)
c := (PI*float32(times))
```
For functions:
```go
package main

import (
  . "math"
)
func main(){
    var PI float32 = 3.14159
    var rotations int = int(float32(32)*PI);
    result := Sin(float64(rotations))) // Conversion is necessary, because math.Sin function has float64 argument
}
```
Integers and floats of different types must be casted as was shown earlier:
```go
var a int = 42
var b int32 = 8
var c int = a+int(b)

var d float64 = 24.0
var e float32 = 6.0
var f float64 = a+float64(b)
```

Visit the following resources to learn more:

- [@official@Tour of Go: Type Casting Basics](https://go.dev/tour/basics/13)
- [@article@Go Docs: Type Casting](https://golangdocs.com/type-casting-in-golang)

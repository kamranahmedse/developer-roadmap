Go simplifies processing json data with the encoding/json package. 

This example shows how to unmarshal some JSON into a struct:

```go
package main

import (
    "encoding/json"
    "fmt"
)

type User struct {
    Name string `json:"name"`
    Age  int    `json:"age"`
}

func main() {
    jsonData := `{"name": "Jane", "age": 28}`
    var user User
    if err := json.Unmarshal([]byte(jsonData), &user); err != nil {
        fmt.Println("Error parsing JSON:", err)
    }
    fmt.Printf("User: %+v\n", user)
}
```

The JSON data, which is just a string at the beginning of this example gets parsed and turned into an actual complex variable that you can refer to and use in your code later on. 
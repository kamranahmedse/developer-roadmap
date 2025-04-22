A struct in Go is a composite data type that groups multiple values in a single place. 

You define a struct using the type keyword, and then you can access its fields using dot notation. For example:

```go
// Define the struct
type Book struct {
    Title  string
    Author string
}

func main() {
    myBook := Book{Title: "Go in Action", Author: "William Kennedy"}
    // Access the properties through dot notation
    fmt.Println("Book:", myBook.Title, "by", myBook.Author)
}
``` 
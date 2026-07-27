# Encoding / JSON

This package provides robust and efficient functionalities for marshaling (encoding) Go data structures into JSON and unmarshaling (decoding) JSON into Go data structures. This process is largely handled through the json.Marshal and json.Unmarshal functions. For a Go struct to be properly encoded or decoded, its fields must be exported (start with an uppercase letter). Developers can control the JSON field names and omit empty fields using struct tags like json:"fieldName,omitempty".

Visit the following resources to learn more:

- [@official@Encoding/json package](https://pkg.go.dev/encoding/json)
- [@article@Go by Example: JSON](https://gobyexample.com/json)
- [@article@How To Use JSON in Go](https://www.digitalocean.com/community/tutorials/how-to-use-json-in-go)
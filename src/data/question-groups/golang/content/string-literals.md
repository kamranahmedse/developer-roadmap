Raw string literals in Go are enclosed in backticks (`` ` ``) and preserve all formatting exactly as written. This is different from interpreted string literals, which process escape sequences like \n. This distinction is particularly useful when you need to process data exactly as it is written.

Consider a scenario where you need to embed an HTML template directly into your Go code. With raw string literals, you can include the HTML exactly as written without worrying about escaping characters or preserving the formatting. For example:

```go
htmlTemplate := `<!DOCTYPE html>
<html>
    <head>
        <title>Example</title>
    </head>
    <body>
        <h1>Hello, World!</h1>
    </body>
</html>`
```

In this case, the raw string literal enclosed in backticks preserves newlines, tabs, and any other whitespace exactly as you write them. 
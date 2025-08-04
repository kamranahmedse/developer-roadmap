# Memory Management

Largely automatic through garbage collection. Runtime decides stack (fast, auto-cleaned) vs heap (slower, GC required) allocation via escape analysis. Understanding allocation patterns and avoiding memory leaks helps write efficient, scalable Go programs.

Visit the following resources to learn more:

- [@official@The Go Memory Model](https://go.dev/ref/mem)
- [@article@An overview of memory management in Go](https://medium.com/safetycultureengineering/an-overview-of-memory-management-in-go-9a72ec7c76a8)
- [@article@How Go Manages Memory and Why It's So Efficient](https://medium.com/@siddharthnarayan/how-go-manages-memory-and-why-its-so-efficient-68c13133ba1c)
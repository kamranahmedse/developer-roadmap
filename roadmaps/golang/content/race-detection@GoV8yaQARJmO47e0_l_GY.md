# Race Detection

Built-in tool for detecting race conditions in concurrent programs. Enabled with `-race` flag during build/test/run. Detects unsynchronized access to shared variables from multiple goroutines. Performance overhead in race mode. Essential for debugging concurrent code safety.

Visit the following resources to learn more:

- [@official@Race Detection](https://go.dev/doc/articles/race_detector)
- [@article@Go: Race Detector with ThreadSanitizer](https://medium.com/a-journey-with-go/go-race-detector-with-threadsanitizer-8e497f9e42db)
- [@article@Data Race Detection and Data Race Patterns in Golang](https://www.sobyte.net/post/2022-06/go-data-race/)
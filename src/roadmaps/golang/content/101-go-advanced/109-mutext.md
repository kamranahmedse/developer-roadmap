# Mutex

Go allows us to run code concurrently using goroutines. However, when concurrent processes access the same piece of data, it can lead to [race conditions](https://www.sohamkamani.com/golang/data-races/). Mutexes are data structures provided by the [sync](https://pkg.go.dev/sync/) package. They can help us place a lock on different sections of data so that only one goroutine can access it at a time.

- [ Using a Mutex in Go with Examples](https://www.sohamkamani.com/golang/mutex/)

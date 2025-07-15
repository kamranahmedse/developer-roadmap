# Mutexes

Mutual exclusion locks from sync package ensuring only one goroutine accesses shared resource at a time. Use `Lock()` before and `Unlock()` after critical section. RWMutex allows multiple readers or single writer. Essential for protecting shared data from race conditions.
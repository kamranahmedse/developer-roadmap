# WaitGroups

Synchronization primitive from sync package for waiting on multiple goroutines to complete. Use `Add()` to increment counter, `Done()` when goroutine finishes, `Wait()` to block until counter reaches zero. Essential for coordinating goroutine completion in concurrent programs.
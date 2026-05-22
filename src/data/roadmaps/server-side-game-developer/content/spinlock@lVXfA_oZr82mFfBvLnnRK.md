# Spinlock

`Spinlock` is a type of synchronization mechanism that exists in a busy-wait-state (essentially, 'spinning') until the lock can be acquired. This contrasts with other locking mechanisms that might put a thread to sleep if the desired lock is not available. It's generally used in scenarios where thread sleeping (context switching) could be costlier than spinning. However, it must be handled properly. An improperly managed spinlock can cause high CPU usage, as the wait is active; it continually consumes processing capacity. Hence, their usage is more beneficial in scenarios where the wait time to acquire a lock is reasonably short.
Learn more from the following resources:

- [@article@What is Spinlock in Operating System? - GeeksforGeeks](https://www.geeksforgeeks.org/operating-systems/what-is-spinlock-in-operating-system/)
- [@article@Spinlock - Wikipedia](https://en.wikipedia.org/wiki/Spinlock)
- [@article@Introduction to Spin Locks - Microsoft Learn](https://learn.microsoft.com/en-us/windows-hardware/drivers/kernel/introduction-to-spin-locks)

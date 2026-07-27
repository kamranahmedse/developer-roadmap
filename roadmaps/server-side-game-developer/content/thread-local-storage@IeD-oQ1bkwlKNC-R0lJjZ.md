# Thread Local Storage

`Thread Local Storage (TLS)` is a mechanism by which variables are allocated such that each thread gets its own individually allocated variable, but the name of the variable is the same in each thread. In other words, the same variable can simultaneously hold different values for different threads. TLS is required when you need to use a global or static variable in a thread-safe manner but the data must be unique to each thread. TLS can be used in many applications, but it is particularly useful for storing per-thread state in server applications.

Visit the following resources to learn more:

- [@article@Thread-local storage - Wikipedia](https://en.wikipedia.org/wiki/Thread-local_storage)
- [@article@Thread Local Storage - Win32 apps - Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/procthread/thread-local-storage)
- [@article@All about thread-local storage - MaskRay](https://maskray.me/blog/2021-02-14-all-about-thread-local-storage)
# Registered I/O  

**Registered I/O** is an optimization technique that enhances the performance of asynchronous 
I/O operations by pre-registering resources such as file descriptors, memory buffers, or 
network sockets with the operating system. This reduces the overhead of repeated system calls 
and resource management, making it highly beneficial for server-side game development, where 
low-latency and high-throughput are critical. Technologies like `io_uring` and Windows
`RIO (Registered I/O)` API leverage this approach to minimize kernel interactions, improving 
efficiency for handling large-scale multiplayer game servers. By reducing context switching 
and memory allocation overhead, Registered I/O helps game servers achieve smoother performance 
and lower latency.  

Visit the following resources to learn more:

- [@official@Microsoft Registered I/O (RIO)](https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2012-r2-and-2012/hh997032(v=ws.11))  
- [@article@RIO then IOCP then just plain old Winsock2](https://wirepair.org/2023/08/19/rio-then-iocp-then-just-plain-old-winsock2/)
- [@article@Windows Overlapped IO vs Registered IO (RIO) vs IOCP - Stack Overflow](https://stackoverflow.com/questions/73878597/what-are-the-differences-between-windows-overlapped-io-registered-io-rio-and)
- [@article@What is io_uring? - Lord of the io_uring](https://unixism.net/loti/what_is_io_uring.html)

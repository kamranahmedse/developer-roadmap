# io_uring

**io_uring** is a modern asynchronous I/O framework introduced in Linux 5.1, designed to 
provide high-performance, low-latency I/O operations. It is widely used in server-side game 
development to efficiently handle network and disk operations, making it ideal for real-time 
multiplayer games. Unlike `epoll` or traditional polling mechanisms, `io_uring` minimizes 
system calls by using a shared memory ring buffer between the kernel and user space, reducing 
context switching overhead. This results in improved scalability and responsiveness, allowing 
game servers to handle thousands of concurrent connections with minimal CPU usage.  

Visit the following resources to learn more:

- [@official@Linux io_uring_enter](https://man7.org/linux/man-pages/man2/io_uring_enter.2.html)
- [@article@Efficient Networking with io_uring](https://lwn.net/Articles/776703/)
- [@article@io_uring by Example: Introduction - Unixism](https://unixism.net/2020/04/io-uring-by-example-part-1-introduction/)
- [@official@io_uring(7) Linux Manual Page - man7.org](https://man7.org/linux/man-pages/man7/io_uring.7.html)
- [@article@Why You Should Use io_uring for Network I/O - Red Hat](https://developers.redhat.com/articles/2023/04/12/why-you-should-use-iouring-network-io)

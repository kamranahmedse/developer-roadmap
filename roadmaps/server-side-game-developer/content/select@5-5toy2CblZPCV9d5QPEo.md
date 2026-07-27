# select  

**select** is a multiplexing system call in Linux used for monitoring multiple file descriptors
to check if they are ready for I/O operations. It is commonly used in server-side game 
development for handling multiple connections asynchronously. However, `select` has 
limitations, as it scans all file descriptors linearly, making it inefficient for handling 
a large number of concurrent connections. Despite its drawbacks, it remains useful for 
simpler applications or legacy systems. Modern alternatives like `epoll` or `kqueue` offer 
better performance and scalability.  

Visit the following resources to learn more:

- [@official@Linux select API](https://man7.org/linux/man-pages/man2/select.2.html)
- [@article@I/O Multiplexing: The select and poll Functions - Shichao's Notes](https://notes.shichao.io/unp/ch6/)
- [@article@Linux select() - Synchronous I/O Multiplexing - phoenixNAP](https://phoenixnap.com/kb/linux-select)
- [@official@select() - IBM Documentation](https://www.ibm.com/docs/en/zos/3.1.0?topic=functions-select-suspend-execution-pending-multiple-descriptors)

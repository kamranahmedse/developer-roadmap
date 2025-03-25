# epoll  

**epoll** is a high-performance I/O event notification system in Linux, essential for handling 
large-scale asynchronous network operations in server-side game development. Unlike `select` 
or `poll`, it uses an event-driven model, reducing CPU overhead and improving scalability. 
Game servers leverage epoll to efficiently manage thousands of concurrent connections, 
responding only when events occur, minimizing system calls, and optimizing resource 
usage—making it ideal for multiplayer games and real-time applications.

Visit the following resources to learn more:

- [@documentation@Linux epoll API](https://man7.org/linux/man-pages/man7/epoll.7.html)  
- [@article@Understanding epoll for Scalable Network Servers](https://medium.com/@copyconstruct/the-method-to-epolls-madness-d9d2d6378642)
- [@article@epoll vs select vs poll](https://devarea.com/linux-io-multiplexing-select-vs-poll-vs-epoll/)
# WSA-Poll

**WSA-Poll** is a Windows-specific alternative to `poll`, used for monitoring multiple sockets 
for readiness in non-blocking network applications. It is commonly utilized in server-side 
game development to handle multiple client connections efficiently. Unlike `select`, `WSA-Poll`
eliminates the limitation of FD_SETSIZE, allowing it to scale better for a larger number of 
connections. However, it is generally less efficient than `epoll` on Linux due to its linear 
scanning mechanism. For high-performance game servers on Windows, IOCP (I/O Completion Ports) 
is often preferred over `WSA-Poll`.  

Visit the following resources to learn more:

- [@documentation@Microsoft WSA-Poll Documentation](https://learn.microsoft.com/en-us/windows/win32/api/winsock2/nf-winsock2-wsapoll)
# WSA-Poll

**WSA-Poll** is a Windows-specific alternative to `poll`, used for monitoring multiple sockets 
for readiness in non-blocking network applications. It is commonly utilized in server-side 
game development to handle multiple client connections efficiently. Unlike `select`, `WSA-Poll`
eliminates the limitation of FD_SETSIZE, allowing it to scale better for a larger number of 
connections. However, it is generally less efficient than `epoll` on Linux due to its linear 
scanning mechanism. For high-performance game servers on Windows, IOCP (I/O Completion Ports) 
is often preferred over `WSA-Poll`.  

Visit the following resources to learn more:

- [@official@Microsoft WSA-Poll Documentation](https://learn.microsoft.com/en-us/windows/win32/api/winsock2/nf-winsock2-wsapoll)
- [@article@WSAPoll is Broken - Daniel Stenberg](https://daniel.haxx.se/blog/2012/10/10/wsapoll-is-broken/)
- [@article@WSAPOLLFD Structure - Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/winsock2/ns-winsock2-wsapollfd)
- [@article@WSAPoll Sample Code - Microsoft Windows Classic Samples](https://github.com/microsoft/Windows-classic-samples/blob/main/Samples/Win7Samples/netds/winsock/wsapoll/poll.cpp)

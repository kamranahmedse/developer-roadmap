# Heavyweight vs Lightweight

TCP (Transmission Control Protocol) is often described as a "heavyweight" protocol because it provides numerous features such as error-checking, guaranteed delivery, and order-of-arrival of data packets, which makes it more complex to implement in the server. This complexity results in additional server load, making it heavier in terms of processing resources and system requirements. 

On the other hand, UDP (User Datagram Protocol) is known as a "lightweight" protocol. It is simpler and faster because it does not offer the same extensive features as TCP. UDP does not guarantee delivery, does not require initial handshake establishment between communicating systems, and does not put data packets in order, thereby reducing the computation and rendering it lightweight.

Visit the following resources to learn more:

- [@article@Processes and Threads - Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/procthread/processes-and-threads)
- [@article@Operating Systems: Threads - UIC](https://www.cs.uic.edu/~jbell/CourseNotes/OperatingSystems/4_Threads.html)
- [@article@Lightweight vs Heavyweight Processes - Stack Overflow](https://stackoverflow.com/questions/6004069/lightweight-vs-heavyweight-processes)

# Datagram

A **Datagram** is the basic unit of data transfer in network communication using protocols such as User Datagram Protocol (UDP). Each datagram operates independently of each other, meaning they may be received in a different order than they were sent, or they might not be received at all. Therefore, unlike TCP (Transmission Control Protocol), UDP does not guarantee that datagrams are delivered in the same order that they were sent, or even at all - hence known as connectionless protocol. However, it is faster and more efficient for applications that do not require delivery guarantees, such as voice over IP, live video broadcasts, and other real-time applications. Each datagram contains information about the sender, the intended recipient, and the data that it is intended to communicate along with its size and other specifications.
Visit the following resources to learn more:

- [@article@What Is User Datagram Protocol (UDP)? - Fortinet](https://www.fortinet.com/resources/cyberglossary/user-datagram-protocol-udp)
- [@article@UDP (User Datagram Protocol) Explained in Details - ClouDNS](https://www.cloudns.net/blog/udp-user-datagram-protocol-explained-in-details/)
- [@article@Understanding UDP Protocol: Applications and Security - Cavli Wireless](https://www.cavliwireless.com/blog/not-mini/understanding-udp-protocol-applications-and-security)

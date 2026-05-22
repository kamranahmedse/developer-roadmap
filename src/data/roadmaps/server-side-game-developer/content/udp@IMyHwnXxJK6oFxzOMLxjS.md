# UDP

`UDP`, or User Datagram Protocol, is a communications protocol that sends data over the internet. Unlike TCP (Transmission Control Protocol), it's a connectionless protocol that doesn't ensure data packet delivery. It transmits datagrams – an independent, discrete packet of data – without first establishing a proper handshake between the sender and the receiver. The sender doesn't wait for an acknowledgment after sending a datagram, and the receiver doesn't send any acknowledgment upon receiving a datagram. This makes UDP faster but less reliable than TCP. UDP is used for time-sensitive transmissions where dropped packets are acceptable, such as in live video streaming, voice over IP (VoIP), and online multiplayer gaming.

Visit the following resources to learn more:

- [@article@User Datagram Protocol (UDP) - Beej's Guide to Network Concepts](https://beej.us/guide/bgnet0/html/split/user-datagram-protocol-udp.html)
- [@article@What Is User Datagram Protocol (UDP)? - emnify](https://www.emnify.com/blog/udp)
- [@article@What is UDP (User Datagram Protocol)? - IPCisco](https://ipcisco.com/lesson/udp-user-datagram-protocol/)

# Packet vs Datagram

**Packet** and **Datagram** are terms used in data communication. 

A **Packet** is the most general term that just refers to the encapsulated data passed across networks. It is the generic term used to describe unit of data at all levels of the protocol stack. Packets include not just the data, but also headers and footers with control information, such as source and destination addresses, error checking codes, and sequencing information. 

On the other hand, a **Datagram** is a specific type of data packet. It is an independent, self-contained message sent over the network whose arrival, arrival time, and content are not guaranteed. This term is particularly associated with the UDP (User Datagram Protocol), where each transmission unit is called a datagram. 

The difference between packets and datagrams depends largely on the protocol being used to transmit the data. TCP (Transmission Control Protocol) data is typically referred to as a packet, whereas with UDP it is a datagram.
Visit the following resources to learn more:

- [@article@Datagram - Wikipedia](https://en.wikipedia.org/wiki/Datagram)
- [@article@What are the differences between datagrams, frames, and network packets? - Network Engineering Stack Exchange](https://networkengineering.stackexchange.com/questions/50083/what-are-the-differences-in-the-contents-of-datagrams-frames-and-network-packe)
- [@article@TCP/IP packets and datagrams - Stack Overflow](https://stackoverflow.com/questions/14026858/tcp-ip-packets-and-datagrams)

# Packet vs Datagram

**Packet** and **Datagram** are terms used in data communication. 

A **Packet** is the most general term that just refers to the encapsulated data passed across networks. It is the generic term used to describe unit of data at all levels of the protocol stack. Packets include not just the data, but also headers and footers with control information, such as source and destination addresses, error checking codes, and sequencing information. 

On the other hand, a **Datagram** is a specific type of data packet. It is an independent, self-contained message sent over the network whose arrival, arrival time, and content are not guaranteed. This term is particularly associated with the UDP (User Datagram Protocol), where each transmission unit is called a datagram. 

The difference between packets and datagrams depends largely on the protocol being used to transmit the data. TCP (Transmission Control Protocol) data is typically referred to as a packet, whereas with UDP it is a datagram.
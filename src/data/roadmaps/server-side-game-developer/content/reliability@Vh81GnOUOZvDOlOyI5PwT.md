# Reliability

Reliability refers to how consistently a data packet can be transferred from one system to another over a network. In terms of the User Datagram Protocol (UDP), it has a lack of reliability built into it. This means UDP does not guarantee that your data will reach its destination, it merely sends the packets without any acknowledgement of receipt. Unlike its counterpart, Transmission Control Protocol (TCP), which implements error-checking mechanisms to ensure data integrity and delivery. In summary, if you require high reliability in your server side game development, protocols other than UDP might need to be considered.
Learn more from the following resources:

- [@article@Reliability and Congestion Avoidance over UDP - Gaffer On Games](https://gafferongames.com/post/reliability_ordering_and_congestion_avoidance_over_udp/)
- [@article@Transmission Control Protocol (TCP) - GeeksforGeeks](https://www.geeksforgeeks.org/computer-networks/what-is-transmission-control-protocol-tcp/)
- [@article@UDP Packet Reliability and Re-sending - Stack Overflow](https://gamedev.stackexchange.com/questions/106722/udp-packet-reliability-and-re-sending)

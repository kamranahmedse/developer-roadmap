# Checksum

The `checksum` is an important element in UDP that ensures the integrity and validation of the data being transmitted. It computes the total sum of all the bytes in a packet and incorporates it as an additional `checksum` field in the UDP header. When the packet arrives at its destination, this process is repeated and compared with the included `checksum`. If a match is observed, the packet is deemed valid. If not, it signifies that an error occurred during transmission possibly due to noise or any third-party interference. In such a case, the packet is simply dropped, as UDP does not initiate any retransmission or error correction procedure. This is why a perfect output cannot be guaranteed with UDP, nor can it determine whether all the recipients are receiving the packets properly.
Visit the following resources to learn more:

- [@article@User Datagram Protocol - Wikipedia](https://en.wikipedia.org/wiki/User_Datagram_Protocol)
- [@article@How is TCP and UDP Checksum Calculated - slashroot.in](https://www.slashroot.in/how-is-tcp-and-udp-checksum-calculated)
- [@article@Calculating the UDP Checksum - SecurityNik](https://www.securitynik.com/2015/08/calculating-udp-checksum-with-taste-of.html)

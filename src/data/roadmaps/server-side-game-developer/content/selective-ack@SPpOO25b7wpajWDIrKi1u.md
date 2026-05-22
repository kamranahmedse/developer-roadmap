# Selective Acknowledgement

Selective Acknowledgement (SACK) is a mechanism introduced in TCP to improve its efficiency in handling packet loss in the network. When TCP detects packet loss, it normally retransmits all packets sent after the lost packet, regardless of whether they were received successfully or not. SACK, however, allows the receiver to acknowledge non-consecutive packets, effectively informing the sender exactly which packets were received successfully and which weren't. By using this mechanism, TCP can selectively retransmit only those packets that were lost, saving bandwidth and improving overall performance.
Visit the following resources to learn more:

- [@article@RFC 2018 - TCP Selective Acknowledgment Options - IETF](https://datatracker.ietf.org/doc/html/rfc2018)
- [@article@RFC 3517: A Conservative Selective Acknowledgment (SACK)-based Loss Recovery Algorithm - IETF](https://www.rfc-editor.org/rfc/rfc3517.html)
- [@article@RFC 2883: An Extension to SACK for D-SACK - IETF](https://www.hjp.at/doc/rfc/rfc2883.html)

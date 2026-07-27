# Reliable Transmission  

**Reliable transmission** ensures that data sent over a network reaches its destination 
accurately and in the correct order, a critical requirement for server-side game development. 
`TCP` achieves this through mechanisms like acknowledgments (ACKs), sequence numbers, and 
retransmission strategies. When a packet is lost or corrupted, `TCP` retransmits it using 
algorithms such as automatic repeat request (ARQ) and fast retransmit. Additionally, flow 
control and congestion control work together to prevent data loss due to network congestion. 
Reliable transmission is essential for maintaining synchronization in multiplayer games, 
preventing desynchronization issues, and ensuring a smooth gaming experience.  

Visit the following resources to learn more:

- [@article@Reliable Transmission](https://book.systemsapproach.org/direct/reliable.html)
- [@article@TCP Reliable Transmission (IETF RFC 793)](https://datatracker.ietf.org/doc/html/rfc793)
- [@article@Automatic Repeat Request (ARQ) - Wikipedia](https://en.wikipedia.org/wiki/Automatic_repeat_request)
- [@article@Sliding Window Protocol - Wikipedia](https://en.wikipedia.org/wiki/Sliding_window_protocol)
- [@official@RFC 3366 - Advice to Link Designers on Link ARQ - IETF](https://datatracker.ietf.org/doc/html/rfc3366)

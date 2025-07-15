# Max Segment Size (MSS)  

**Max Segment Size (MSS)** is a crucial concept in `TCP` networking, representing the largest 
amount of data that can be sent in a single `TCP` segment, excluding the `TCP` header. `MSS` is 
vital for optimizing performance in server-side game development, as it helps to avoid 
fragmentation and ensures that data is transmitted efficiently over the network. By adjusting 
the `MSS`, game servers can minimize packet fragmentation, which can lead to increased latency 
and reduced throughput. Typically, `MSS` is determined during the `TCP` handshake based on the 
maximum transmission unit (MTU) of the network, and it can be configured to suit the needs of 
specific applications or networks. Optimizing `MSS` can improve the overall reliability and 
performance of data transfers, especially in multiplayer games where real-time communication 
and high throughput are essential.

Visit the following resources to learn more:

- [@article@RFC 879 - Maximum Segment Size](https://tools.ietf.org/html/rfc879)  
- [@article@What is MSS (maximum segment size)?](https://www.cloudflare.com/learning/network-layer/what-is-mss/)  
- [@documentation@TCP Maximum Segment Size tuning](https://www.ibm.com/docs/en/aix/7.2?topic=tuning-tcp-maximum-segment-size)
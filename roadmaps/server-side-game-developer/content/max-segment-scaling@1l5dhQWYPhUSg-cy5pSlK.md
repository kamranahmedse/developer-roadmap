# Max Segment Scaling

`Max Segment Scaling (MSS)` is a TCP feature that defines the maximum amount of data that can be received in a single TCP segment. It is specified during the TCP connection establishment phase. The MSS is calculated as the data link layer Maximum Transmission Unit (MTU) minus the size of the TCP and IP headers. The mechanism helps to avoid fragmentation at the IP layer, ensuring the data packets sent are optimal for the network path taken, preventing potential transmission inefficiencies or packet loss issues.

Visit the following resources to learn more:

- [@article@RFC 6691 - TCP Options and Maximum Segment Size (MSS) - IETF](https://www.rfc-editor.org/rfc/rfc6691.html)
- [@article@Maximum Segment Size - Wikipedia](https://en.wikipedia.org/wiki/Maximum_segment_size)
- [@article@Description of Windows TCP Features - Microsoft Learn](https://learn.microsoft.com/en-us/troubleshoot/windows-server/networking/description-tcp-features)

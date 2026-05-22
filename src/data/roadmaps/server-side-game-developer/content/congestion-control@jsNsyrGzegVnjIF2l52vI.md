# Congestion Control

`Congestion Control` is a critical feature of TCP, but not inherently a part of UDP. The primary purpose of congestion control is to prevent too much data from being sent into the network such that it can't handle the traffic, leading to packet loss. TCP's congestion control mechanism adjusts the data send rate based on the perceived network congestion. UDP does not provide congestion control by itself. However, this does not mean congestion control can't be implemented if you're using UDP. Developers can implement a custom congestion control mechanism over UDP, but it requires substantial understanding and careful management to achieve this without creating network or server performance issues.</div>
Visit the following resources to learn more:

- [@article@TCP Congestion Control (RFC 2581) - IETF](https://datatracker.ietf.org/doc/html/rfc2581)
- [@article@How is congestion avoided when using UDP? - Stack Exchange](https://networkengineering.stackexchange.com/questions/79588/how-is-congestion-avoided-when-using-udp)
- [@article@Congestion Control - Wikipedia](https://en.wikipedia.org/wiki/Congestion_control)

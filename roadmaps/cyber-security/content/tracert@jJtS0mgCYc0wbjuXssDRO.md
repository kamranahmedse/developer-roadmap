# Tracert

Tracert, short for traceroute, is a command-line network utility used to trace the route that packets take to reach a specific destination. It works by sending packets with incrementally increasing Time-To-Live (TTL) values. As each router along the path receives a packet, it decrements the TTL. When the TTL reaches zero, the router sends an ICMP "Time Exceeded" message back to the source. By analyzing these messages, tracert identifies each router (hop) in the path and measures the round-trip time (RTT) to each hop.

Visit the following resources to learn more:

- [@article@traceroute man page](https://linux.die.net/man/8/traceroute)
- [@article@tracert](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/tracert)
- [@video@Traceroute (tracert) Explained](https://www.youtube.com/watch?v=up3bcBLZS74)
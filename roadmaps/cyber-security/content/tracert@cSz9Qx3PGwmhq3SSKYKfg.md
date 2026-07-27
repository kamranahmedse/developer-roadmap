# Tracert

Tracert (traceroute) is a command-line network diagnostic tool used to trace the route that a packet takes from your computer to a specified destination. It works by sending out a series of packets with increasing time-to-live (TTL) values. Each router along the path decrements the TTL, and when a packet's TTL reaches zero, the router sends back an ICMP "time exceeded" message. Tracert records these responses from each router, providing a list of hops and the round-trip time for each hop.

Visit the following resources to learn more:

- [@article@traceroute man page](https://linux.die.net/man/8/traceroute)
- [@article@tracert](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/tracert)
- [@video@Traceroute (tracert) Explained](https://www.youtube.com/watch?v=up3bcBLZS74)
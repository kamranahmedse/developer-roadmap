# Traceroute

Traceroute is a powerful network diagnostic tool widely used in Linux systems for troubleshooting network connectivity issues. It helps identify the path that network packets take from the local system to a specified destination, such as a website or remote server.

Traceroute is particularly useful for:

1. **Routing Troubleshooting**: It can help identify where in the network path a problem is occurring, such as a slow or unresponsive hop.
2. **Latency Measurement**: Traceroute displays the round-trip time (RTT) for each hop along the network path, allowing you to measure the latency between your system and the destination.
3. **Network Structure Visualization**: By tracing the route, you can gain insights into the network topology and the number of intermediate hops between your system and the destination.

To use traceroute on a Ubuntu Linux system, simply run the following command in the terminal:

```bash
traceroute www.roadmap.sh
```

This will display the network path and the round-trip time for each hop along the way to the `www.roadmap.sh` website.

Traceroute works by sending a series of UDP packets with incrementing Time-to-Live (TTL) values. As the packets traverse the network, each router along the path decrements the TTL value and, when the TTL reaches 0, the router sends an ICMP "time exceeded" message back to the source. Traceroute uses these ICMP messages to determine the network path and measure the latency.

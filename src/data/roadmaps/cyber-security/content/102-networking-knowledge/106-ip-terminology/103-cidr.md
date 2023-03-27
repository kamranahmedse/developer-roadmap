# CIDR

CIDR, or Classless Inter-Domain Routing, is a method of allocating IP addresses and routing Internet Protocol packets in a more flexible and efficient way, compared to the older method of Classful IP addressing. Developed in the early 1990s, CIDR helps to slow down the depletion of IPv4 addresses and reduce the size of routing tables, resulting in better performance and scalability of the Internet.

## How CIDR works

CIDR achieves its goals by replacing the traditional Class A, B, and C addressing schemes with a system that allows for variable-length subnet masking (VLSM). In CIDR, an IP address and its subnet mask are written together as a single entity, referred to as a _CIDR notation_. 

A CIDR notation looks like this: `192.168.1.0/24`. Here, `192.168.1.0` is the IP address, and `/24` represents the subnet mask. The number after the slash (/) is called the _prefix length_, which indicates how many bits of the subnet mask should be set to 1 (bitmask). The remaining bits of the subnet mask are set to 0.

For example, a `/24` prefix length corresponds to a subnet mask of `255.255.255.0`, because the first 24 bits are set to 1. This allows for 256 total IP addresses in the subnet, with 254 of these IPs available for devices (The first and last IP are reserved for the network address and broadcast address, respectively).

## Advantages of CIDR

- **Efficient IP allocation:** CIDR allows for more granular allocation of IPv4 addresses, reducing wasted IP space.
- **Reduction of routing table size:** CIDR enables route aggregation (route summarization), which combines multiple network routes to a single routing table entry.
- **Decreased routing updates:** By allowing routers to share more generalized routing information, the number of routing updates gets significantly reduced, improving network stability and reducing router workload.

## CIDR in IPv6

CIDR also plays a crucial role in the IPv6 addressing system, where the use of CIDR notation and address aggregation has become even more critical in managing the immense address space of IPv6 efficiently.

In conclusion, CIDR is an essential component of modern IP networking systems, enabling better utilization of IP address space and improving the overall scalability and performance of the Internet. It's crucial for network administrators and security professionals to have a solid understanding of CIDR, as it plays a significant role in configuring, managing, and securing IP networks.
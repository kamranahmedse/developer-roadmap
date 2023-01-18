# Layer 4 Load Balancing

Layer 4 load balancers look at info at the transport layer to decide how to distribute requests. Generally, this involves the source, destination IP addresses, and ports in the header, but not the contents of the packet. Layer 4 load balancers forward network packets to and from the upstream server, performing Network Address Translation (NAT).

To learn more, visit the following links:

- [What is Layer 4 Load Balancing?](https://github.com/donnemartin/system-design-primer#communication)
- [Getting Started with Layer 4 Load Balancing](https://www.nginx.com/resources/glossary/layer-4-load-balancing/)
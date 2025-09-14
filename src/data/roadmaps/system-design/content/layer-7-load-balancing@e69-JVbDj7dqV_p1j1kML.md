# Layer 7 Load Balancing

Layer 7 load balancers look at the application layer to decide how to distribute requests. This can involve contents of the header, message, and cookies. Layer 7 load balancers terminate network traffic, reads the message, makes a load-balancing decision, then opens a connection to the selected server. For example, a layer 7 load balancer can direct video traffic to servers that host videos while directing more sensitive user billing traffic to security-hardened servers.

At the cost of flexibility, layer 4 load balancing requires less time and computing resources than Layer 7, although the performance impact can be minimal on modern commodity hardware.

---

### Visit the following resources to learn more:
- [GeeksforGeeks: Layer 4 Load Balancing vs Layer 7 Load Balancing](https://www.geeksforgeeks.org/system-design/layer-4-load-balancing-vs-layer-7-load-balancing/)

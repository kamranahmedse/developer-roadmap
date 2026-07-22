# Static vs Dynamic NAT

Static NAT creates a permanent, one-to-one mapping between a specific private IP address and a specific public IP address, ensuring that a device always appears on the Internet with the same public IP. It is commonly used for servers that need to be consistently reachable from outside the network, such as web servers or mail servers hosted internally. Dynamic NAT, on the other hand, maps private IP addresses to public IP addresses from a pool on a first-come, first-served basis, with no device being guaranteed a specific public IP. Dynamic NAT is less common than PAT since it still requires one public IP per active connection, but is used in scenarios where full PAT is not suitable.

Visit the following resources to learn more:

- [@article@Static vs Dynamic NAT: What’s the Difference?](https://www.h2kinfosys.com/blog/static-vs-dynamic-nat-whats-the-difference/)
- [@video@NAT Explained - Network Address Translation](https://www.youtube.com/watch?v=FTUV0t6JaDA)
- [@video@NAT vs PAT, Static vs Dynamic](https://www.youtube.com/watch?v=KA56kj23RPU)
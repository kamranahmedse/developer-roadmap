# Subnetting in Linux

Subnetting is a fundamental concept in Linux networking. It involves dividing a network into smaller subnetworks, known as subnets, to improve network performance and security. In Linux, subnetting is managed within the context of the Internet Protocol (IP) addressing scheme, where it's crucial for organizing and managing IP addresses within a network, preventing IP conflicts, and efficiently utilizing IP address ranges. This technique is invaluable in large, complex Linux networking environments where IP address management can become increasingly intricate.

Here's how you can work with subnetting in Linux, using Ubuntu Linux as an example:

```bash
# Display the current routing table
$ route -n

# Add a new subnet
$ sudo route add -net 192.168.2.0/24 gw 192.168.1.1
```

In the above example, replace `192.168.2.0/24` with your desired subnet address and network mask, and `192.168.1.1` with the intended default gateway for the subnet.

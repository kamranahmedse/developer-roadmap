# Subnetting 

Subnetting is a critical process in Linux networking. This practice involves dividing a network into two or more networks, known as subnets. Subnetting helps improve network performance and security. In Linux, subnetting can be managed within the context of the Internet Protocol (IP) addressing scheme, where it's crucial in organizing and managing IP addresses within a network, preventing IP conflicts and efficiently utilizing IP address ranges. This technique is invaluable in large complex Linux networking environments where IP address management can become overwhelmingly intricate.

Generally, the following commands are used in Linux for subnetting:

```shell
# Display current routing table
$ route -n 

# Add a new subnet
$ route add -net xxx.xxx.xxx.x/xx gw yyy.yyy.yyy.y
```

Please replace the `xxx.xxx.xxx.x/xx` with your desired subnet address and network mask and replace `yyy.yyy.yyy.y` with the intended default gateway for the subnet.
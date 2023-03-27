# Public vs Private IP Addresses

When it comes to IP addresses, they are categorized in two major types: Public IP Addresses and Private IP Addresses. Both play a key role in network communication; however, they serve different purposes. Let's examine them more closely:

## Public IP Addresses

A public IP address is a globally unique IP address that is assigned to a device or a network. This type of IP address is reachable over the Internet and enables devices to communicate with other devices, servers, and networks located anywhere in the world. 

Here are some key features of public IP addresses:

- Routable over the Internet.
- Assigned by the Internet Assigned Numbers Authority (IANA).
- Usually assigned to an organization or Internet Service Provider (ISP).
- Can be either static (permanent) or dynamic (changes periodically).

Example: `72.14.207.99`

## Private IP Addresses

Private IP addresses, on the other hand, are used within local area networks (LANs) and are not visible on the Internet. These addresses are reserved for internal use within an organization, home, or local network. They are often assigned by a router or a network administrator for devices within the same network, such as your computer, printer, or smartphone.

Here are some key features of private IP addresses:

- Not routable over the Internet (requires Network Address Translator (NAT) to communicate with public IP addresses).
- Assigned by local network devices, such as routers or network administrators.
- Reusable in different private networks (as they are not globally unique).
- Static or dynamic (depending on the network's configuration).

Private IP address ranges:

- `10.0.0.0` to `10.255.255.255` (Class A)
- `172.16.0.0` to `172.31.255.255` (Class B)
- `192.168.0.0` to `192.168.255.255` (Class C)

Example: `192.168.1.100`

In summary, public IP addresses are used for communication over the Internet, whereas private IP addresses are used within local networks. Understanding the difference between these two types of IP addresses is essential for grasping the basics of network connectivity and cyber security.
# DNS Resolution in Networking on Linux

Domain Name System (DNS) is a decentralized system used for converting hostnames into IP addresses, making it easier for users to access websites without having to remember specific numeric IP addresses. DNS resolution, therefore, is a critical aspect of networking in Linux.

On Linux systems, when an application needs to connect to a certain URL, it consults the DNS resolver. This resolver, using the file `/etc/resolv.conf`, communicates with the DNS server, which then converts the URL into an IP address to establish a network connection.

Below command is used to query DNS and fetch IP addresses:

```bash
nslookup www.example.com
```

Or using dig command:

```bash
dig www.example.com
```

Getting a good understanding of the DNS resolution process provides a solid base for tasks like network troubleshooting and web server setup on a Linux system.
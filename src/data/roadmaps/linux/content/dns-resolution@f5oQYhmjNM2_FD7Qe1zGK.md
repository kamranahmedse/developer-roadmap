# DNS Resolution

DNS (Domain Name System) converts hostnames to IP addresses, enabling users to access websites without remembering numeric addresses. Linux systems use `/etc/resolv.conf` to configure DNS resolution. Applications consult the DNS resolver, which communicates with DNS servers for address translation. Use `nslookup` or `dig` commands to query DNS and troubleshoot network connectivity issues.

Below command is used to query DNS and fetch IP addresses:

```bash
nslookup www.example.com
```

Or using dig command:

```bash
dig www.example.com
```

Getting a good understanding of the DNS resolution process provides a solid base for tasks like network troubleshooting and web server setup on a Linux system.
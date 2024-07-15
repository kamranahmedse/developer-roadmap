# nmap

**Nmap** (Network Mapper) is an open-source network scanner that is widely used in cyber security for discovering hosts and services on a computer network. Nmap allows you to efficiently explore and scan networks to identify open ports, running services, and other security vulnerabilities.

## Features of Nmap

- **Host Discovery**: Nmap facilitates finding hosts on the network using various techniques such as ICMP echo requests, TCP SYN/ACK probes, and ARP scans.

- **Port Scanning**: Nmap can identify open ports on target hosts, which can reveal potential security vulnerabilities and provide crucial information during a penetration test.

- **Service and Version Detection**: Nmap can detect the name and version of the services running on target hosts. This information helps to identify software that might be outdated or have known security flaws.

- **Operating System Detection**: Nmap can make intelligent guesses about the operating system of a target host, which can be useful for tuning your attack strategy based on the vulnerabilities of specific systems.

- **Scriptable**: Nmap has a built-in scripting engine (NSE) that allows users to write custom scripts for automating and extending its functionality.

## How to use Nmap

Nmap can be installed on various platforms such as Windows, Linux, and macOS. After installation, Nmap can be used via the command line with different options and flags, depending on the desired scan type.

For example, to perform a simple host and port discovery, the following command can be used:

```bash
nmap -sn -p 80,443 192.168.0.0/24
```

This command will perform a "ping scan" (`-sn`) on the specified IP range (`192.168.0.0/24`) and check for open ports 80 and 443.

## Important Notes

- While Nmap is a valuable tool for cyber security professionals, it can also be used by malicious attackers to gather information about potential targets. It is essential to use Nmap responsibly and only on networks and systems that you have permission to scan.

- Scanning large networks can generate considerable traffic and may impact the performance of the target hosts. It is important to configure your scans appropriately and be mindful of potential network disruptions.

For more information and usage examples, refer to the [official Nmap documentation](https://nmap.org/book/man.html).

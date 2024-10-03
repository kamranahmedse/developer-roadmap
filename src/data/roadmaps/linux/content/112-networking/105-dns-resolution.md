# DNS Resolution in Networking on Linux

The Domain Name System (DNS) is a decentralized system that translates human-readable domain names into the corresponding IP addresses, making it easier for users to access websites without memorizing specific numeric IP addresses. DNS resolution is a crucial aspect of networking on Linux systems.

When an application needs to connect to a website on a Linux system, it consults the DNS resolver, which uses the `/etc/resolv.conf` file to communicate with a DNS server. The DNS server then converts the domain name into an IP address, allowing the application to establish a network connection.

Here's an example of how to use the `nslookup` command to query a DNS server and fetch the IP address for a domain on Ubuntu Linux:

```bash
$ nslookup www.roadmap.sh
Server:         127.0.0.53
Address:        127.0.0.53#53

Non-authoritative answer:
Name:   www.roadmap.sh
Address: 104.21.13.175
```

Alternatively, you can use the `dig` command, which provides more detailed information about the DNS resolution process:

```bash
$ dig www.roadmap.sh
; <<>> DiG 9.16.1-Ubuntu <<>> www.roadmap.sh
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 58731
;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 65494
;; QUESTION SECTION:
;www.roadmap.sh.                  IN      A

;; ANSWER SECTION:
www.roadmap.sh.           300     IN      A       104.21.13.175

;; Query time: 23 msec
;; SERVER: 127.0.0.53#53(127.0.0.53)
;; WHEN: Tue Apr 18 14:45:06 UTC 2023
;; MSG SIZE  rcvd: 59
```

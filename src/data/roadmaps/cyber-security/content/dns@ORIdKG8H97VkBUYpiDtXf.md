# DNS

**DNS** is a key component in the internet infrastructure that translates human-friendly domain names (e.g., `www.example.com`) into IP addresses (e.g., `192.0.2.44`). This translation process enables us to easily connect to websites and other online resources without having to remember complex numeric IP addresses.

The DNS operates as a distributed and hierarchical system which involves the following components:

- **DNS Resolver**: Your device's initial contact point with the DNS infrastructure, often provided by your Internet Service Provider (ISP) or a third-party service like Google Public DNS.

- **Root Servers**: The authoritative servers on the top of the DNS hierarchy that guide DNS queries to the appropriate Top-Level Domain (TLD) servers.

- **TLD Servers**: These servers manage the allocation of domain names for top-level domains, such as `.com`, `.org`, etc.

- **Authoritative Name Servers**: These are the servers responsible for storing the DNS records pertaining to a specific domain (e.g., `example.com`).

Some common DNS record types you might encounter include:

- **A (Address) Record**: Maps a domain name to an IPv4 address.
- **AAAA (Address) Record**: Maps a domain name to an IPv6 address.
- **CNAME (Canonical Name) Record**: Maps an alias domain name to a canonical domain name.
- **MX (Mail Exchange) Record**: Specifies the mail servers responsible for handling email for the domain.
- **TXT (Text) Record**: Contains human-readable or machine-readable text, often used for verification purposes or providing additional information about a domain.

As an essential part of the internet, the security and integrity of the DNS infrastructure are crucial. However, it's vulnerable to various types of cyber attacks, such as DNS cache poisoning, Distributed Denial of Service (DDoS) attacks, and DNS hijacking. Proper DNS security measures, such as DNSSEC (DNS Security Extensions) and monitoring unusual DNS traffic patterns, can help mitigate risks associated with these attacks.

- [@article@DNS in detail (TryHackMe)](https://tryhackme.com/room/dnsindetail)
- [@video@DNS Explained in 100 Seconds (YouTube)](https://www.youtube.com/watch?v=UVR9lhUGAyU)
- [@feed@Explore top posts about DNS](https://app.daily.dev/tags/dns?ref=roadmapsh)

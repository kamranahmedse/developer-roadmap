## DNS(Domain Name System) Poisoning/DNS Spoofing/DNS Cache Poisoning
Before digging into DNS Poisoning let's understand about DNS and DNS Server.
# DNS(Domnain Name System):
Domain Name System used to convert human input data [address that is readable by humans only] to web browser readable formate in form of IP Address like _www.google.com_ **(human input)** to _192.168.1.1_ **(web browser readable form)** means DNS is kind of translator for web browser which converts to domain address to ip address.

DNS is kind of phonebook for internet which use to change name to IP Address so that internet and web browser can talk to each other and share information with one another.It's just the overview of DNS not let's move to DNS Server.

# DNS Server:
A server is a dedicated device or program designed to provide services to other applications, referred to as 'clients'. DNS clients, which are built into most modern desktop and mobile operating systems, enable web browsers to interact with DNS servers.

DNS is made possible by four types of integrated DNS servers—
1. recursive DNS servers
2. root name servers
3. top level domain name servers
4. authoritative name servers.

Now let's talk about DNS Poisoning.


**DNS spoofing or DNS cache poisoning, occurs when fake information is inserted into a DNS server’s cache.**
**This causes DNS queries to return incorrect IP addresses, directing users to the wrong websites. Hackers exploit this to reroute traffic to malicious sites. The issue persists until the cached information is corrected.**


**When the cache is poisoned, it misdirects traffic until the incorrect information is fixed. This technique exploits vulnerabilities in the DNS system and can spread to other servers, causing widespread issues.**


Here’s how it works:


1. DNS Query: When you type a website name, your computer asks the DNS server for the corresponding IP address.

2. Poisoned Cache: If the DNS server’s cache has been poisoned, it provides a fake IP address.

3. Redirection: Your browser is then directed to a malicious site, which could look identical to the real one.


Visit the following resources to learn more:

- [Cloudflare](https://www.cloudflare.com/learning/dns/dns-cache-poisoning/)
* [Fortinet](https://www.fortinet.com/resources/cyberglossary/dns-poisoning)
  
* [GeekforGeeks](https://www.geeksforgeeks.org/dns-spoofing-or-dns-cache-poisoning/)

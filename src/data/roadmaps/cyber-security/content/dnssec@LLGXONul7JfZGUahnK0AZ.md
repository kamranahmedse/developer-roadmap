# DNS Security Extensions (DNSSEC)

DNS Security Extensions (DNSSEC) is a suite of protocols designed to add a layer of security to the Domain Name System (DNS) by enabling DNS responses to be authenticated. While DNS itself resolves domain names into IP addresses, it does not inherently verify the authenticity of the responses, leaving it vulnerable to attacks like cache poisoning, where an attacker injects malicious data into a DNS resolver’s cache. DNSSEC addresses this by using digital signatures to ensure that the data received is exactly what was intended by the domain owner and has not been tampered with during transit. When a DNS resolver requests information, DNSSEC-enabled servers respond with both the requested data and a corresponding digital signature. The resolver can then verify this signature using a chain of trust, ensuring the integrity and authenticity of the DNS response. By protecting against forged DNS data, DNSSEC plays a critical role in enhancing the security of internet communications.

Learn more from the following resources:

- [@article@How DNSSEC works](https://www.cloudflare.com/en-gb/dns/dnssec/how-dnssec-works/)
- [@video@What is DNSSEC?](https://www.youtube.com/watch?v=Fk2oejzgSVQ)
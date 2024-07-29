# DNSSEC

DNS Security Extensions (DNSSEC) is a protocol designed to address security vulnerabilities in the Domain Name System (DNS). Here are the key points:

- **Digital Signatures:**
DNSSEC protects against attacks by digitally signing DNS data. These signatures ensure data validity and prevent tampering.

- **Hierarchical Signing:**
DNSSEC signs data at every level of the DNS lookup process. For instance, when looking up ‘google.com,’ the root DNS server signs a key for the .COM nameserver, which then signs a key for google.com’s authoritative nameserver.

- **Backwards Compatibility:**
DNSSEC doesn’t disrupt traditional DNS lookups; it adds security without breaking existing functionality. It complements other security measures like SSL/TLS.

- **Chain of Trust:**
DNSSEC establishes a parent-child trust chain from the root zone down to specific domains.
Any compromise in this chain exposes requests to on-path attacks.

Learn more from the following resources:

- [@article@DNSSEC: What Is It and Why Is It Important? - ICANN](https://www.icann.org/resources/pages/dnssec-what-is-it-why-important-2019-03-05-en)
- [@article@How DNSSEC Works - Cloudflare](https://www.cloudflare.com/dns/dnssec/how-dnssec-works/)
- [@article@What is DNS security? - Cloudflare](https://www.cloudflare.com/learning/dns/dns-security/)
- [@video@What is DNSSEC? - IBM](https://www.youtube.com/watch?v=Fk2oejzgSVQ)
- [@video@(DNS) 101 Miniseries](https://www.youtube.com/playlist?list=PLTk5ZYSbd9MhMmOiPhfRJNW7bhxHo4q-K)

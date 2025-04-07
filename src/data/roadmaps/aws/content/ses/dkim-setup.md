# DKIM Setup

DKIM (DomainKeys Identified Mail) is a standard that prevents email spoofing. It allows an organization to take responsibility for transmitting a message in a way that can be verified by mailbox providers. This verification is made possible through cryptographic authentication. In Amazon SES, you can setup DKIM by adding a set of three CNAME records to the DNS configuration of your sending domain. Each record maps a fictitious subdomain of your sending domain to a domain maintained by Amazon SES. After you add these records and they propagate through the internet's DNS infrastructure, you can start sending authenticated email from your domain.

Visit the following resources to learn more:

- [@official@DKIM](https://dkim.org/)
- [@article@DKIM - Cloudflare](https://www.cloudflare.com/learning/email-security/dmarc-dkim-spf/)

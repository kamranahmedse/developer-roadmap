# SSL/TLS Encryption

SSL/TLS is supported by Redis starting with version 6 as an optional feature that needs to be enabled at compile time. TLS will add a layer to the communication stack with overheads due to the read and writes from an SSL connection and integrity checks, this will lead to a decrease of achieveable throughput.

Learn more from the following resources:

- [@official@Redis TLS Support](https://redis.io/docs/latest/operate/oss_and_stack/management/security/encryption/#getting-started)
- [@official@Transport Layer Security Documentation](https://redis.io/docs/latest/operate/rc/security/database-security/tls-ssl/)
# Use HTTPs

> Use HTTPS on server side and secure ciphers

Ensure that your API server uses HTTPS instead of HTTP. HTTPS is a secure protocol that encrypts data in transit, making it difficult for attackers to intercept and read sensitive information. To implement HTTPS, you need to obtain an SSL/TLS certificate and configure your server to use HTTPS.

HTTPS uses ciphers to encrypt data in transit. It is important to choose secure ciphers that are resistant to attacks and offer strong encryption. Some common secure ciphers include AES, ChaCha20, and ECDHE for key exchange. Make sure to disable weak and outdated ciphers, such as RC4 and TLS 1.0/1.1, which are vulnerable to attacks.


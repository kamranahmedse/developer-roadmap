# SSL vs TLS

**SSL (Secure Sockets Layer)** is a cryptographic protocol used to secure communications by encrypting data transmitted between clients and servers. SSL establishes a secure connection through a process known as the handshake, during which the client and server agree on cryptographic algorithms, exchange keys, and authenticate the server with a digital certificate. SSL’s security is considered weaker compared to its successor, TLS, due to vulnerabilities in its older encryption methods and lack of modern cryptographic techniques.

**TLS (Transport Layer Security)** improves upon SSL by using stronger encryption algorithms, more secure key exchange mechanisms, and enhanced certificate validation. Like SSL, TLS begins with a handshake where the client and server agree on a protocol version and cipher suite, exchange keys, and verify certificates. However, TLS incorporates additional features like Perfect Forward Secrecy (PFS) and more secure hashing algorithms, making it significantly more secure than SSL for modern communications.

Learn more from the following resources:

- [@article@What’s the Difference Between SSL and TLS?](https://aws.amazon.com/compare/the-difference-between-ssl-and-tls/)
- [@video@TLS vs SSL - What's the Difference?](https://www.youtube.com/watch?v=J7fI_jH7L84)
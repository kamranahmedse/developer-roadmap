# SSL vs TLS

Secure Sockets Layer (SSL) and Transport Layer Security (TLS) are cryptographic protocols designed to provide secure communication over a computer network. They play a vital role in protecting sensitive information transmitted online, such as login credentials, financial information, and private user data.

## Secure Sockets Layer (SSL)

SSL is the predecessor to TLS and was first introduced in the 1990s. It creates an encrypted connection between a client (typically a web browser) and a server to ensure that any data transmitted remains private and secure. SSL uses a combination of symmetric and asymmetric encryption methods, as well as digital certificates, to establish and maintain secure communication.

## Transport Layer Security (TLS)

TLS is an improved and more secure version of SSL, with TLS 1.0 being released as an upgrade to SSL 3.0. The current version, as of this guide, is TLS 1.3. TLS provides a more robust and flexible security framework, addressing many of the vulnerabilities present in SSL. While many people still refer to SSL when discussing secure web communication, it's important to note that SSL has been deprecated, and TLS is the best-practice standard for secure communication.

## Key Components

- **Encryption**: SSL and TLS use powerful algorithms to protect data through encryption, ensuring it's unreadable by anyone without the proper decryption keys.
- **Authentication**: SSL/TLS digital certificates verify the identities of clients and servers, providing trust and authenticity.
- **Integrity**: These security protocols use message authentication codes to ensure that the data sent between clients and servers has not been tampered with during transmission.

## Handshake Process

SSL and TLS follow a series of steps, known as the "handshake process," to create a secure connection:

- **Client hello**: The client initiates the handshake process by sending a message with supported cryptographic algorithms, random numbers, and session information.
- **Server hello**: The server responds with its chosen cryptographic algorithms, random numbers, and its digital certificate. Optionally, the server can request the client's certificate for mutual authentication.
- **Client verification**: The client verifies the server's certificate and may send its own if requested. It then creates a pre-master secret, encrypts it with the server's public key, and sends it to the server.
- **Key generation and exchange**: Both the client and server generate the master secret and session keys using the pre-master secret and shared random numbers. These keys are used for encrypting and decrypting the data transmitted.
- **Secured connection**: Once the keys are exchanged, the client and server can now communicate securely using the established encryption and keys.

Secure communication is critical for any organization handling sensitive data. SSL and TLS serve as the backbone for protecting data in transit and play a significant role in ensuring the confidentiality, integrity, and authenticity of online communications.

Learn more from the following resources:

- [@article@What’s the Difference Between SSL and TLS?](https://aws.amazon.com/compare/the-difference-between-ssl-and-tls/)
- [@video@TLS vs SSL - What's the Difference?](https://www.youtube.com/watch?v=J7fI_jH7L84)
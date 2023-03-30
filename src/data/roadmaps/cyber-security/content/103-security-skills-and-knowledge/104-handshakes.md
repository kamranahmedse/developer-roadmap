# Understand Handshakes

In the world of cyber security, a **handshake** refers to the process of establishing a connection between two parties or devices as part of a secure communication protocol. A handshake typically ensures that both parties are aware of the connection and also serves to initiate the setup of a secure communication channel.

There are two common types of handshakes in cyber security:

- **Three-Way Handshake**
- **Cryptographic Handshake**

## Three-Way Handshake (TCP Handshake)

In the context of a Transmission Control Protocol (TCP) connection, a three-way handshake is used to establish a secure and reliable connection between two devices. This process involves three specific steps:

- **SYN**: The initiating device sends a SYN (synchronize) packet to establish a connection with the receiving device.
- **SYN-ACK**: The receiving device acknowledges the SYN packet by sending back a SYN-ACK (synchronize-acknowledge) packet.
- **ACK**: The initiating device acknowledges the SYN-ACK packet by sending an ACK (acknowledge) packet.

Once these steps are completed, the connection is established, and data can be exchanged securely between the two devices.

## Cryptographic Handshake (SSL/TLS Handshake)

A cryptographic handshake is used to establish a secure connection using cryptographic protocols like Secure Sockets Layer (SSL) or Transport Layer Security (TLS). The SSL/TLS handshake involves several steps, some of which include:

- **Client Hello**: The initiating party (client) sends a "Client Hello" message, which includes supported cipher suites, SSL/TLS version, and a random value.
- **Server Hello**: The receiving party (server) replies with a "Server Hello" message, choosing the highest SSL/TLS version and a compatible cipher suite, along with its random value.
- **Authentication**: The server shares its digital certificate, allowing the client to verify its identity using a trusted certificate authority (CA).
- **Key Exchange**: Both parties exchange the necessary information (like public keys) to generate a shared secret key that will be used for encryption and decryption.

Once this process is successfully completed, a secure communication channel is established, and encrypted data can be shared between both parties.

Understanding handshakes in cyber security is crucial for professionals, as it helps ensure secure communication and data exchange between devices and users. This knowledge can be useful in protecting sensitive information and preventing cyber attacks.

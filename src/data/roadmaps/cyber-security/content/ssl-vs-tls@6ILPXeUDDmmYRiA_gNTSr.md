# SSL vs TLS

**Secure Socket Layer (SSL)** and **Transport Layer Security (TLS)** are cryptographic protocols designed to provide security and data integrity for communications over networks. These protocols are commonly used for securing web traffic and ensuring that sensitive information, such as credit card numbers and login credentials, are transmitted securely between clients (e.g., web browsers) and servers.

## SSL

SSL was developed by Netscape in the mid-1990s and has gone through several iterations. The last version, SSLv3, was released in 1996. SSL was deprecated in 2015 due to security concerns, and it is not recommended for use in modern applications.

## TLS

TLS is the successor to SSL and is continually evolving with new versions and updates. The most recent version, TLS 1.3, was released in 2018. TLS is widely used and considered the standard for securing web traffic.

## How SSL/TLS Works

SSL/TLS operates by encrypting the data transmitted between a client and a server, ensuring that the data cannot be easily intercepted or tampered with. The encryption is achieved using a combination of cryptographic algorithms, key exchanges, and digital certificates.

Here are the key steps in setting up an SSL/TLS connection:

- **Handshake:** The client and server will engage in a process called a "handshake" to establish a secure connection. During this process, the client and server agree on which version of SSL/TLS to use, and choose the cipher suites and cryptographic algorithms they will use to secure the communication.

- **Key Exchange:** The client and server will perform a key exchange, a process by which they generate and securely share encryption keys. These keys will be used to encrypt and decrypt the data being transmitted between them.

- **Certificate Verification:** The server will provide a digital certificate, which contains its public key and information about the server. The client checks the validity of the certificate by confirming that it was issued by a trusted Certificate Authority (CA) and has not expired.

- **Secure Communication:** Once the handshake, key exchange, and certificate verification are complete, the client and server can begin securely transmitting data using the encryption keys they have shared.

## Advantages of SSL/TLS

- **Secure communication:** SSL/TLS provides a secure, encrypted tunnel for data to be transmitted between clients and servers, protecting sensitive information from eavesdropping, interception, and tampering.

- **Authentication:** SSL/TLS uses digital certificates to authenticate the server and sometimes the client. This helps to ensure that the parties involved in the communication are who they claim to be.

- **Data integrity:** SSL/TLS includes mechanisms to confirm that the data received has not been tampered with during transmission, maintaining the integrity of the information being sent.

Learn more from the following resources:

- [@article@What’s the Difference Between SSL and TLS?](https://aws.amazon.com/compare/the-difference-between-ssl-and-tls/)
- [@video@TLS vs SSL - What's the Difference?](https://www.youtube.com/watch?v=J7fI_jH7L84)
# SSL

Secure Sockets Layer (SSL) is a security protocol which provides encrypted communication between a web browser and a web server. This protocol operates via a process where the SSL certificate, held by the web server, creates two cryptographic keys - a Public Key and a Private Key. The public key is placed into a Certificate Signing Request (CSR) - a file also containing detailed information about the web server and your organization. A certificate authority then validates these details and issue an SSL certificate for your web server. This SSL certificate contains the new, unique public key for your web's session data. When a browser connects to this web server and the SSL handshake is complete, an encrypted SSL session is established via the protocols of symmetric cryptography. It's noteworthy to mention that even though SSL has been succeeded by Transport Layer Security (TLS), people still refer to these certificates as SSL.
Visit the following resources to learn more:

- [@article@What is SSL/TLS: An In-Depth Guide - SSL.com](https://www.ssl.com/article/what-is-ssl-tls-an-in-depth-guide/)
- [@article@What is SSL, TLS and HTTPS? - DigiCert](https://www.digicert.com/what-is-ssl-tls-and-https)
- [@article@What Certificate Do I Need for My Client-Server Game? - GameDev StackExchange](https://gamedev.stackexchange.com/questions/165270/what-certificate-do-i-need-for-my-client-server-game)

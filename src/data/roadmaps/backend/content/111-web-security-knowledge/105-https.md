# HTTPS

HTTPS is a secure way to send data between a web server and a browser.

A communication through HTTPS starts with the handshake phase during which the server and the client agree on how to encrypt the communication, in particular they choose an encryption algorithm and a secret key. After the handshake all the communication between the server and the client will be encrypted using the agreed upon algorithm and key.

The handshake phase uses a particular kind of cryptography, called asymmetric cryptography, to communicate securely even though client and server have not yet agreed on a secret key. After the handshake phase the HTTPS communication is encrypted with symmetric cryptography, which is much more efficient but requires client and server to both have knowledge of the secret key.

Visit the following resources to learn more:

- [What is HTTPS?](https://www.cloudflare.com/en-gb/learning/ssl/what-is-https/)
- [Why HTTPS Matters](https://developers.google.com/web/fundamentals/security/encrypt-in-transit/why-https)
- [Enabling HTTPS on Your Servers](https://developers.google.com/web/fundamentals/security/encrypt-in-transit/enable-https)
- [How HTTPS works (comic)](https://howhttps.works/)
- [SSL, TLS, HTTP, HTTPS Explained](https://www.youtube.com/watch?v=hExRDVZHhig)
- [HTTPS — Stories from the field](https://www.youtube.com/watch?v=GoXgl9r0Kjk)
- [HTTPS explained with carrier pigeons](https://baida.dev/articles/https-explained-with-carrier-pigeons)

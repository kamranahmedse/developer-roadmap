# HSTS Header

> Use HSTS header with SSL to avoid SSL Strip attacks.

SSL strip is a type of attack where an attacker intercepts traffic between a client and a server that is meant to be secured by SSL/TLS encryption, and downgrades the connection to a plain text (non-encrypted) HTTP connection. This type of attack can go unnoticed by the user because the attacker is able to redirect the user to a look-alike website that also uses HTTP instead of HTTPS.

In an SSL strip attack, the attacker sets up a man-in-the-middle (MITM) position between the client and the server. When the client initiates a connection with the server, the attacker intercepts the SSL/TLS traffic and removes or replaces the HTTPS links with HTTP links. This can trick the user into thinking they are using a secure connection when in fact, they are not. The attacker can then monitor and manipulate the data transmitted between the client and server.

HSTS header is a security header that instructs browsers to only access the site over HTTPS. This header is used to prevent SSL Strip attacks. It is a good practice to use HSTS header with SSL.
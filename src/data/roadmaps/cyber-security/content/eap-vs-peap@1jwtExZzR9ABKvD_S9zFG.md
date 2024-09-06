# Extensible Authentication Protocol (EAP) vs Protected Extensible Authentication Protocol (PEAP)

EAP and PEAP are both authentication frameworks used in wireless networks and Point-to-Point connections to provide secure access. EAP is a flexible authentication framework that supports multiple authentication methods, such as token cards, certificates, and passwords, allowing for diverse implementations in network security. However, EAP by itself does not provide encryption, leaving the authentication process potentially vulnerable to attacks.

PEAP, on the other hand, is a version of EAP designed to enhance security by encapsulating the EAP communication within a secure TLS (Transport Layer Security) tunnel. This tunnel protects the authentication process from eavesdropping and man-in-the-middle attacks. PEAP requires a server-side certificate to establish the TLS tunnel, but it does not require client-side certificates, making it easier to deploy while still ensuring secure transmission of credentials. PEAP is widely used in wireless networks to provide a secure authentication mechanism that protects user credentials during the authentication process.

Learn more from the following resources:

- [@article@Extensible Authentication Protocol (EAP) for network access](https://learn.microsoft.com/en-us/windows-server/networking/technologies/extensible-authentication-protocol/network-access?tabs=eap-tls%2Cserveruserprompt-eap-tls%2Ceap-sim)
- [@article@What is Protected Extensible Authentication Protocol (PEAP)](https://www.techtarget.com/searchsecurity/definition/PEAP-Protected-Extensible-Authentication-Protocol)
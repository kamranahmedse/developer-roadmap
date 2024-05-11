# LDAP Proxy Auth

**LDAP** (Lightweight Directory Access Protocol) is an application protocol used for accessing and managing distributed directory information services over a network. While MongoDB already supports LDAP in its Enterprise Edition, **LDAP Proxy Authentication** adds an additional layer of security and simplifies the user management process. It allows MongoDB to delegate the authentication process to an LDAP server without storing any user credentials in the MongoDB server.

In this section, we'll take a closer look at LDAP Proxy Authentication and its benefits.

## How does it work?

- A client sends a request to MongoDB with their credentials.
- MongoDB then forwards the credentials to the LDAP server.
- The LDAP server checks if the provided credentials are valid and authenticates the user accordingly.
- Once the user has been authenticated, MongoDB receives a response from the LDAP server confirming the user's identity and proceeds with executing the requested operation.

## Advantages of using LDAP Proxy Authentication

- **Single sign-on**: Users can use a single set of credentials across different servers and applications that are connected to the LDAP server. This simplifies the login process and reduces the need to remember multiple passwords.
- **Centralized user management**: User information is stored in the LDAP server rather than multiple MongoDB servers. This makes it easier to manage users, as all the changes can be made in one place, and they're instantly applied across all applications using LDAP.
- **Enhanced security**: MongoDB doesn't store any user credentials, which helps protect against unauthorized access in case of a MongoDB server compromise. Additionally, the LDAP server can enforce strong authentication and password policies.
- **Reduced administrative overhead**: Managing users directly in MongoDB can be cumbersome, especially in large-scale deployments with multiple servers. LDAP Proxy Authentication simplifies the process by keeping user information centralized in the LDAP server.

To implement LDAP Proxy Authentication in your MongoDB security setup, you can follow the [official MongoDB documentation](https://docs.mongodb.com/manual/security/authentication/) that provides comprehensive instructions on how to configure the feature depending on your LDAP server and MongoDB version.

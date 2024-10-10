# Network Security

Network security in Redis involves implementing measures to protect the server from unauthorized access and data breaches. Best practices include binding Redis to trusted interfaces, using firewalls to restrict access, and configuring `requirepass` for password protection. Redis should run in a secure network environment, ideally with TLS/SSL enabled for encrypted communication. Additionally, the use of `ACL` (Access Control Lists) provides granular permissions for different users. By disabling dangerous commands and using proper authentication and authorization mechanisms, Redis instances can be secured against common threats such as unauthorized data access and denial-of-service attacks.

Learn more from the following resources:

- [@official@Redis Authentication Documentation](https://redis.io/docs/latest/operate/oss_and_stack/management/security/#authentication)
- [@official@Redis Network Security Documentation](https://redis.io/docs/latest/operate/rc/security/database-security/network-security/)
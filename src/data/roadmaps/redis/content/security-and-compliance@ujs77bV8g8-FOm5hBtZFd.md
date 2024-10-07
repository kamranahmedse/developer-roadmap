# Security and Compliance

Security and compliance in Redis involve implementing various measures to protect data, ensure secure access, and adhere to relevant regulatory standards. Redis provides several built-in security features, such as password authentication using the `requirepass` directive, which restricts access to authorized users only. Additionally, Redis supports TLS/SSL encryption, allowing for secure communication between clients and the server, protecting data in transit from eavesdropping and tampering. Access control can be further enhanced through Redis's Access Control Lists (ACLs), which allow administrators to define user roles and permissions, controlling which commands users can execute and which keys they can access. It’s also important to configure Redis to bind to trusted network interfaces, limiting exposure to potential threats.

Learn more from the following resources:

- [@official@Redis Security Documentation](https://redis.io/docs/latest/operate/rs/security/)
- [@article@How to Secure Redis](https://goteleport.com/blog/secure-redis/)
- [@video@Rediscover Redis Security](https://www.youtube.com/watch?v=oD8k3ymbfkY)
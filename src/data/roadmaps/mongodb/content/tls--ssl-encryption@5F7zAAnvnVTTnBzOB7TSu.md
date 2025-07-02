# TLS / SSL Encryption

TLS/SSL encryption in MongoDB provides secure communication channels between clients and the database server, as well as between replica set members and sharded cluster components, ensuring that data transmitted over networks is protected from eavesdropping and tampering. This transport layer security encrypts all network traffic using industry-standard cryptographic protocols, supports certificate-based authentication for enhanced security, and can be configured for mutual authentication where both client and server verify each other's identities. Implementing TLS/SSL is essential for production deployments, especially in cloud environments or when MongoDB instances communicate across untrusted networks, as it prevents man-in-the-middle attacks and ensures data confidentiality during transmission.

Visit the following resources to learn more:

- [@official@TLS / SSL Encryption](https://www.mongodb.com/docs/manual/core/security-transport-encryption/)
- [@official@Configure mongod and mongos for TLS/SSL](https://www.mongodb.com/docs/manual/tutorial/configure-ssl/)
- [@article@How to Enable TLS/SSL on MongoDB](https://medium.com/mongoaudit/how-to-enable-tls-ssl-on-mongodb-d973a92cefa6)

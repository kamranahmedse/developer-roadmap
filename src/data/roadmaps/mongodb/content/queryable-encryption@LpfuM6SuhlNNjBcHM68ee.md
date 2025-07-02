# Queryable Encryption

Queryable Encryption is MongoDB's advanced security feature that allows you to encrypt sensitive data while still being able to query it efficiently without decrypting the entire dataset. This cryptographic technique enables applications to perform equality queries on encrypted fields using deterministic encryption and range queries using order-preserving encryption, providing a balance between data security and functionality. It's particularly valuable for applications that need to comply with strict data protection regulations while maintaining the ability to search and filter encrypted data, such as healthcare systems handling patient records or financial applications managing sensitive transaction data.

Visit the following resources to learn more:

- [@official@Queryable Encryption](https://www.mongodb.com/docs/manual/core/queryable-encryption/)
- [@article@Queryable Encryption in MongoDB](https://www.geopits.com/blog/intro-to-queryable-encryption-in-mongodb.html)

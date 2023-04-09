# Client-Side Field Level

Client-Side Field Level Encryption (CSFLE) in MongoDB provides enhanced security by encrypting specific fields of a document while they are stored in the database. With CSFLE, the data is encrypted and decrypted on the client-side, securing sensitive data from unauthorized access by malicious actors or even database administrators.

## Key Features

- **Field-level granularity**: Encrypt only the required fields in a document, ensuring optimal performance while maintaining security.
- **Automatic encryption and decryption**: The MongoDB client library automatically encrypts and decrypts sensitive fields, without requiring any manual intervention.
- **Separation of duties**: Client-Side Field Level Encryption separates the management of encryption keys and the encrypted data, allowing for a more secure infrastructure.

## How It Works

- **Define a JSON Schema**: Specify the fields to be encrypted in the JSON schema, along with the encryption type, algorithm, and key management options.
- **Generate a Data Encryption Key**: Generate a data encryption key (DEK) using a secure source of randomness. This key will be used to encrypt and decrypt sensitive fields.
- **Encrypt fields**: When inserting or updating documents, MongoDB will automatically encrypt the specified fields using the configured encryption options and DEK.
- **Store encrypted data**: The encrypted data is stored in the database, securely protecting sensitive information from unauthorized access.
- **Query and decrypt**: When querying the data, MongoDB decrypts the encrypted fields on the client side, allowing users to interact with the data seamlessly.

## Supported Algorithms

MongoDB supports the following encryption algorithms for CSFLE:

- **Deterministic Encryption**: This encryption method allows for equality queries on encrypted fields. It uses the same encryption key and plaintext to generate the same encrypted data, ensuring that the same values will be encrypted the same way.
- **Random Encryption**: This encryption method provides a higher level of security by using different values for each encryption, even with identical plaintext. It is suitable for fields that don't require searching or querying based on individual values.

## Key Management

CSFLE requires the use of a separate Key Management System (KMS) to store and maintain encryption keys. MongoDB supports the following KMS providers:

- AWS Key Management Service (KMS)
- Azure Key Vault
- Google Cloud KMS
- Local Key Management (using a local master key)

By using CSFLE in MongoDB, you can significantly enhance the security of your sensitive data and comply with regulatory standards such as GDPR, HIPAA, and PCI-DSS.

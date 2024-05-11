# Encryption at Rest

Encryption at Rest refers to the process of encrypting data when it is stored within a database system such as MongoDB. The goal is to protect sensitive information from unauthorized access in cases like a security breach or if the database server is physically stolen.

## Benefits

- **Enhanced Security**: By encrypting the data, you make it more difficult for attackers to access sensitive information.
- **Compliance**: Encryption at rest can help you meet various regulatory compliance requirements that mandate data protection.
- **Reduced Risk**: If someone gains unauthorized access to the storage, they won't be able to read the encrypted data.

## How it Works in MongoDB

MongoDB Enterprise edition supports encryption at rest using WiredTiger, the default storage engine. It internally uses **libsodium** library to perform encryption and decryption operations. The encryption process has three major components:

- **Encryption key management**: MongoDB uses symmetric encryption algorithms with keys that must be generated and securely stored. You can store the master keys in a secure external key management server or use locally managed external keys.

- **Encryption algorithm**: MongoDB supports both AES-256-CBC and AES-256-GCM encryption algorithms for encrypting data at rest. You should select an algorithm suitable for your specific security needs.

- **Encrypted Storage Engine**: WiredTiger storage engine uses the selected encryption algorithm to encrypt all database files, including indexes, journals, and log files.

## Configuring Encryption at Rest

To enable encryption at rest in MongoDB, you have to perform the following steps:

- **Generate the encryption key**: Generate the symmetric encryption key and store it securely. You should use key management best practices to ensure secure key storage and rotation.

- **Configure the key management**: In your `mongod.conf`, set the path to the encryption key and choose the method to manage the encryption key (`local` or `kmip`).

- **Choose the encryption algorithm**: Specify the encryption algorithm (AES256-CBC or AES256-GCM) in your `mongod.conf`.

- **Enable encryption**: Turn on the `encryptWith` parameter in the WiredTiger storage engine.

Example `mongod.conf` file:

```yaml
storage:
  wiredTiger:
    engineConfig:
      encryptWith: 'AES256-CBC'
      encryptionKeyManager:
        keyLocation: '/path/to/encryption/key'
        keyManagement: 'local'
```

Start MongoDB with:

```bash
mongod --config /etc/mongod.conf
```

By configuring encryption at rest, you are now providing an added layer of security to your MongoDB database, making it more difficult for unauthorized users to access sensitive information while ensuring compliance with regulatory requirements.

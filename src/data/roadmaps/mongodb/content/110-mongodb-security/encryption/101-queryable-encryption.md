# Queryable encryption

Queryable encryption is a security feature offered by MongoDB, which allows the users to perform queries on encrypted data without decrypting it. This ensures data confidentiality while maintaining the ability to perform essential database operations. It is particularly useful in protecting sensitive data such as Personally Identifiable Information (PII), credit card numbers, or medical records.

Here we discuss the following aspects of queryable encryption in MongoDB:

## Client-Side Field Level Encryption (FLE)

Client-side FLE is a technique where data is encrypted on the client-side before it is sent to the MongoDB server. This ensures that only encrypted data is stored in the database, and sensitive fields remain confidential. With client-side FLE, the encryption keys are managed outside of the database server, granting even finer control over data access.

## Supported Algorithms

MongoDB supports two types of encryption algorithms for queryable encryption:

- **Deterministic Encryption**: This algorithm allows exact matches of the encrypted field values. It means, if two values are the same, their encrypted versions will also be the same. This kind of encryption allows performing operations like equality and `$in` queries, sorting, and more. However, deterministic encryption can leak some frequency details about the original data.

- **Randomized Encryption**: This algorithm ensures that the same value will result in different encrypted values, providing a higher level of security. However, randomized encryption does not allow performing database operations like equality or sorting on the encrypted fields.

## Indexing Encrypted Fields

One of the crucial benefits of queryable encryption in MongoDB is the support for indexing encrypted fields. You can create indexes on fields encrypted with deterministic encryption to improve query performance. However, indexing is not supported on fields encrypted with randomized encryption, as the encrypted values are not predictable.

## Supported Data Types

Queryable encryption in MongoDB supports encrypting fields with various data types, including strings, numbers (integers, doubles, and decimals), dates, and binary data (including UUIDs and ObjectIDs). However, it does not support encrypting fields containing arrays, embedded documents, or other special data types.

## Encryption Performance

Implementing queryable encryption may introduce some performance overhead while performing encryption and decryption operations on the client-side. It is essential to evaluate the impact of encryption on your application and consider optimizing the encryption settings or the database schema based on the use case.

In summary, queryable encryption in MongoDB offers a powerful way to secure sensitive data while enabling necessary database operations like querying and indexing. By using client-side field level encryption and choosing appropriate encryption algorithms, you can strike the right balance between data confidentiality and performance.

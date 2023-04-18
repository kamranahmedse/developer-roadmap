# SSL Settings

## SSL Settings in PostgreSQL

Secure Sockets Layer (SSL) is a protocol that provides a secure channel for communication between a client and a server. It ensures that all data exchanged between the server and the client is encrypted and authenticated to avoid eavesdropping and tampering. In PostgreSQL, SSL can be enabled and configured to enhance the security of your database. This section will provide you with a brief summary of SSL settings in PostgreSQL.

### Enabling SSL

To enable SSL in PostgreSQL, you need to set the `ssl` configuration parameter to `on` in the `postgresql.conf` file.

```bash
ssl = on
```

After enabling SSL, you need to provide the server's SSL key and certificate, which can either be a self-signed certificate or a certificate issued by a trusted Certificate Authority (CA). By default, PostgreSQL looks for these files in the data directory with the names `server.key` and `server.crt`.

### SSL Certificates and Keys

Here are the steps to create a self-signed certificate and a private key for the server:

1. Generate a private key using the command below:

   ```bash
   openssl genpkey -algorithm RSA -out server.key -pkeyopt rsa_keygen_bits:2048
   ```

2. Set proper permissions:

   ```bash
   chmod 600 server.key
   ```

3. Create a self-signed certificate:

   ```bash
   openssl req -new -x509 -days 365 -key server.key -out server.crt -subj "/C=XX/ST=XX/L=XX/O=XX/CN=XX"
   ```

### Client Verification

PostgreSQL allows you to specify the level of SSL security for client connections using the `sslmode` setting in the `pg_hba.conf` file. Available options are:

- `disable`: No SSL.
- `allow`: Choose SSL if the server supports it, otherwise a non-SSL connection.
- `prefer`: (default) Choose SSL if the server supports it, but allow non-SSL connections.
- `require`: SSL connections only.
- `verify-ca`: SSL connections, and verify that the server certificate is issued by a trusted CA.
- `verify-full`: SSL connections, verify CA, and check that the server hostname matches the certificate.

### Certificate Revocation Lists (CRL)

To revoke a certificate, add it to the Certificate Revocation List (CRL). Upon connection, the server checks if the client's certificate is present in the CRL. You can configure PostgreSQL to use a CRL by setting the `ssl_crl_file` configuration parameter:

```bash
ssl_crl_file = 'path/to/your/crl.pem'
```

To create and update a CRL, you can use the `openssl` tool.

### Summary

Understanding SSL settings in PostgreSQL is vital for ensuring the security of your database. Enabling SSL, creating certificates and keys, configuring client verification levels, and managing certificate revocations will help you keep your connections and data secure.
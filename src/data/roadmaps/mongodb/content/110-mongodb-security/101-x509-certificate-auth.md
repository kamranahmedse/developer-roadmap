# X.509 Certificate Auth

X.509 certificate authentication is a crucial aspect of MongoDB security that enables clients to verify each other's authenticity using public key infrastructure (PKI). With X.509 certificate authentication, both the client and MongoDB server confirm the identity of the other party, ensuring secure communication and preventing unauthorized access.

## Implementing X.509 Certificate Authentication

To incorporate x.509 certificate authentication, follow these steps:

- **Obtain Certificates**: Get an X.509 certificate for the server and each client that connects to the MongoDB server. The certificates must be issued by a single Certificate Authority (CA).

- **Configure the MongoDB Server**: To enable X.509 authentication, you'll need to start MongoDB with the following options:

  ```bash
  mongod --tlsMode requireTLS --tlsCertificateKeyFile /path/to/server.pem --tlsCAFile /path/to/ca.pem --auth
  ```

  Replace `/path/to/server.pem` with the path to the MongoDB server certificate file and `/path/to/ca.pem` with the CA certificate file. Add `--auth` to require authentication for all connections.

- **Create the User Administrator**: Use the following command on the `admin` database to create a user administrator with an X.509 certificate:

  ```javascript
  db.getSiblingDB('$external').runCommand({
    createUser:
      'C=US,ST=New York,L=New York City,O=MongoDB,OU=kerneluser,CN=client@example.com',
    roles: [
      { role: 'userAdminAnyDatabase', db: 'admin' },
      { role: 'clusterAdmin', db: 'admin' },
      { role: 'readWriteAnyDatabase', db: 'admin' },
      { role: 'dbAdminAnyDatabase', db: 'admin' },
    ],
    writeConcern: { w: 'majority', wtimeout: 5000 },
  });
  ```

  Replace the `createUser` field with your X.509 certificate's subject.

- **Authenticate with the Client Certificate**: To authenticate the client, use a `mongo` shell command that includes the client certificate and CA certificate files:

  ```bash
  mongo --tls --tlsCertificateKeyFile /path/to/client.pem --tlsCAFile /path/to/ca.pem --authenticationDatabase '$external' --authenticationMechanism 'MONGODB-X509' --host hostname.example.com
  ```

  Update `/path/to/client.pem` with the client certificate file path and `/path/to/ca.pem` with the CA certificate file. Replace `hostname.example.com` with your MongoDB server's hostname.

After successfully implementing these steps, you will have enabled X.509 certificate authentication for your MongoDB environment, providing an added layer of security for client-server communications.

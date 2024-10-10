# Bcrypt

Bcrypt is a password-hashing function designed to securely hash passwords for storage in databases. Created by Niels Provos and David Mazières, it's based on the Blowfish cipher and incorporates a salt to protect against rainbow table attacks. Bcrypt's key feature is its adaptive nature, allowing for the adjustment of its cost factor to make it slower as computational power increases, thus maintaining resistance against brute-force attacks over time. It produces a fixed-size hash output, typically 60 characters long, which includes the salt and cost factor. Bcrypt is widely used in many programming languages and frameworks due to its security strength and relative ease of implementation. Its deliberate slowness in processing makes it particularly effective for password storage, where speed is not a priority but security is paramount.

Visit the following resources to learn more:

- [@opensource@bcrypt](https://github.com/kelektiv/node.bcrypt.js)
- [@article@Understanding bcrypt](https://auth0.com/blog/hashing-in-action-understanding-bcrypt/)
- [@video@bcrypt explained](https://www.youtube.com/watch?v=AzA_LTDoFqY)

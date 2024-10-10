# JWT Algorithm

> Do not extract the algorithm from the header, use backend.

Extracting the algorithm from the header of a JWT can pose a security risk, as an attacker could modify the algorithm and potentially gain unauthorized access. It is therefore recommended to verify the algorithm on the backend rather than extracting it from the header. This can help ensure that the algorithm used to sign and verify the token is secure and has not been tampered with.

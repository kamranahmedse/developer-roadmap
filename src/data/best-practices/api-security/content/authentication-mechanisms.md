# Authentication Mechanisms

> Use standard authentication mechanisms for generating tokens, storing credentials, and authenticating users.

Here are some examples of established authentication mechanisms that you can use instead of reinventing the wheel:

- OAuth: OAuth is a widely used open standard for authorization that enables users to grant third-party applications access to their resources without sharing their credentials. It is commonly used by web services and APIs to enable users to sign in with their social media accounts or other third-party accounts.

- OpenID Connect: OpenID Connect is an authentication protocol built on top of OAuth 2.0 that enables users to authenticate with multiple websites and applications using a single set of credentials. It is commonly used for single sign-on (SSO) across multiple websites and applications.

- SAML: Security Assertion Markup Language (SAML) is an XML-based standard for exchanging authentication and authorization data between parties. It is commonly used for SSO across multiple domains or organizations.

- Password hashing algorithms: Password hashing algorithms like bcrypt and scrypt are widely used to securely store and protect user passwords. These algorithms ensure that even if an attacker gains access to the password database, they will not be able to easily recover the passwords.

- Two-factor authentication (2FA): 2FA is an authentication mechanism that requires users to provide two forms of identification to access their accounts. This typically involves something the user knows (like a password) and something the user has (like a mobile device or security key). Many services and applications now offer 2FA as an additional security measure.

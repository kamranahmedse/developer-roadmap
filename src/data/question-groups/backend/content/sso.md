At a very high level, the steps required to implement an SSO solution are:

- Picking an identity provider, such as [Okta](https://www.okta.com/) or [Keycloack](https://www.keycloak.org/).
- Each application will then integrate with the Identity provider from the previous step using a standard SSO protocol, such as SAML, OpenID or any other.
- For the first user access, the application will connect with the IdP and authenticate the user, getting an access token in return.
- Then during subsequent requests, the application will validate the provided token through the IdP.
OIDC
OpenID Connect (OIDC) is an identity layer built on top of OAuth 2.0. While OAuth 2.0 handles authorization (what you can do), OIDC handles authentication (who you are). It introduces the concept of an ID token, a signed JWT that contains claims about the authenticated user, such as their name, email, and user ID. OIDC is the standard behind "Sign in with Google / GitHub / Apple" flows and is the correct choice when your API needs to verify a user's identity, not just their permissions.

Visit the following resources to learn more:

- [@article@OIDC: Simplifying Secure Authentication With OpenID Connect](https://www.fortinet.com/resources/cyberglossary/oidc)
- [@video@OAuth 2.0 and OpenID Connect (in plain English)](https://www.youtube.com/watch?v=996OiexHze0)
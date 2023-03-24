# redirect_uri

> Validate `redirect_uri’ on server-side to prevent open redirect attacks.

In OAuth, `redirect_uri` is a parameter that specifies the URI (Uniform Resource Identifier) that the authorization server should redirect the user to after authentication is complete. The `redirect_uri` is often used in the OAuth flow to return an authorization code or access token to the client application.

It is important to validate the `redirect_uri` on the server-side to prevent attacks such as open redirection attacks. In an open redirection attack, an attacker can modify the `redirect_uri` parameter to redirect the user to a malicious website. By validating the `redirect_uri` on the server-side, you can ensure that the redirect URI is a valid and authorized URI for the client application.

Validating the `redirect_uri` on the server-side can also prevent other types of attacks such as phishing attacks or cross-site request forgery (CSRF) attacks. By verifying that the `redirect_uri` matches a predefined list of authorized URIs, you can ensure that the user is redirected to a trusted site after authentication is complete.
# Avoid Implicit Grant Flow

> Avoid `response_type=token’ and try to exchange for code instead.

In OAuth, `response_type=token` is a method for obtaining an access token directly from the authorization endpoint, without using an authorization code. This method is known as the implicit grant flow.

However, it is recommended to avoid using `response_type=token` and instead use the authorization code grant flow, where the client exchanges an authorization code for an access token. This is because the implicit grant flow can be less secure than the authorization code grant flow.

The reason for this is that the access token is returned directly to the client in the URL fragment of the redirect URI. This means that the access token could be intercepted or exposed in the browser history or server logs. In contrast, with the authorization code grant flow, the access token is returned to the client only after the client has exchanged the authorization code for the token using a secure server-to-server communication.

Therefore, by using the authorization code grant flow instead of the implicit grant flow, you can help to protect the access token from being exposed or intercepted by malicious actors.

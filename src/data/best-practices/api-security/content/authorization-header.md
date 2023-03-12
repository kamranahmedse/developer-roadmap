# Authorization Header

> Use standard `Authorization` header for sending tokens instead of custom headers or query/body parameters

Sending tokens in the query or body parameters is generally not recommended because these parameters may be logged or cached by various systems, including web servers, proxies, and gateways. This can potentially lead to the exposure of sensitive data, including authentication tokens.

Additionally, sending tokens in query or body parameters can make them more vulnerable to cross-site request forgery (CSRF) attacks. In a CSRF attack, an attacker can trick a user into submitting a request that includes their authentication token, which the attacker can then use to impersonate the user and gain access to their account.

By contrast, using the `Authorization` header to send tokens helps to ensure that the tokens are not logged or cached by intermediary systems, and it can also help to protect against CSRF attacks by allowing the server to validate the token before processing the request.
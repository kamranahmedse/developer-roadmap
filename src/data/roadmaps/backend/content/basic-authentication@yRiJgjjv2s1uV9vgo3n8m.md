# Basic authentication

Basic Authentication is a simple HTTP authentication scheme built into the HTTP protocol. It works by sending a user's credentials (username and password) encoded in base64 format within the HTTP header. When a client makes a request to a server requiring authentication, the server responds with a 401 status code and a "WWW-Authenticate" header. The client then resends the request with the Authorization header containing the word "Basic" followed by the base64-encoded string of "username:password". While easy to implement, Basic Authentication has significant security limitations: credentials are essentially sent in plain text (base64 is easily decoded), and it doesn't provide any encryption. Therefore, it should only be used over HTTPS connections to ensure the credentials are protected during transmission. Due to its simplicity and lack of advanced security features, Basic Authentication is generally recommended only for simple, low-risk scenarios or as a fallback mechanism.

Visit the following resources to learn more:

- [@roadmap.sh@HTTP Basic Authentication](https://roadmap.sh/guides/http-basic-authentication)
- [@video@Basic Authentication in 5 minutes](https://www.youtube.com/watch?v=rhi1eIjSbvk)
- [@video@Illustrated HTTP Basic Authentication](https://www.youtube.com/watch?v=mwccHwUn7Gc)
- [@feed@Explore top posts about Authentication](https://app.daily.dev/tags/authentication?ref=roadmapsh)

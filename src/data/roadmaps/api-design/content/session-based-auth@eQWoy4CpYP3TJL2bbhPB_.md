# Session Based Authentication in API Design 

Application Programming Interfaces (APIs) are critical for building software applications. Among several key considerations during API design, one is deciding how to implement authentication and security. Session Based Authentication is one popular way to apply security in API design. 

This method revolves around the server creating a session for the user after they successfully log in, associating it with a session identifier. This Session ID is then stored client-side within a cookie. On subsequent requests, the server validates the Session ID before processing the API call. The server will destroy the session after the user logs out, thereby invalidating the Session ID. 

Understanding Session Based Authentication is crucial for secure API design, especially in scenarios where security is a top priority or in legacy systems where this method is prevalent.

Learn more from the following resources:

- [@roadmap@Session Based Authentication](https://roadmap.sh/guides/session-based-authentication)
- [@video@Session Based Authentication - Roadmap.sh](https://www.youtube.com/watch?v=gKkBEOq_shs)
- [@article@Session vs Token Authentication](https://www.authgear.com/post/session-vs-token-authentication)
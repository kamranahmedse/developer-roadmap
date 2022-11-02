# Basic authentication
Basic authentication is a simple method for authenticating users before granting access to resources. When using the Basic Authentication, the client sends HTTP requests with the Authorization header that contains the word **Basic** followed by a space and a base64-encoded string username:password. Basic Authenication is not a very secured method as base64 is easily decoded. Therefore, it should be used together with other security mechanisms like HTTPS/SSL.

#### Free Content 
[What is Basic Authentication?](https://www.wallarm.com/what/what-is-basic-authentication-all-you-need-to-know)

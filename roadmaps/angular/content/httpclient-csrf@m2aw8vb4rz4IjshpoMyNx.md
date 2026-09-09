# HttpClient CSRF

HttpClient CSRF protection is a built-in mechanism that helps prevent Cross-Site Request Forgery attacks by validating requests against a security token. When this feature is enabled, the framework automatically reads a token from a cookie and sets it as an HTTP header for subsequent requests. The server then verifies this token to ensure that the request originated from the intended application rather than a malicious site.

Visit the following resources to learn more:

- [@official@Angular Security](https://angular.dev/best-practices/security#httpclient-xsrf-csrf-security)
- [@article@How can you protect Angular Web app from cross site request forgery?](https://www.linkedin.com/advice/3/how-can-you-protect-angular-web-app-from-cross-site-pyqwc)
- [@article@Cross Site Request Forgery: XSRF protection in Angular](https://borstch.com/blog/development/cross-site-request-forgery-xsrf-protection-in-angular)
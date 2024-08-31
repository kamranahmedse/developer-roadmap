# XSRF protection

HttpClient includes a built-in mechanism to prevent XSRF attacks. When making HTTP requests, an interceptor reads a token from a cookie (default name: XSRF-TOKEN) and sets it as an HTTP header (X-XSRF-TOKEN). Since only code running on your domain can read this cookie, the backend can verify that the HTTP request originates from your client application and not from an attacker.

However, HttpClient only handles the client-side aspect of XSRF protection. Your backend service must be configured to set the cookie for your page and verify that the header is present on all relevant requests. Without this backend configuration, Angular’s default XSRF protection will not be effective.

Visit the following resources to learn more:

- [@official@Angular Official Docs - Security](https://angular.dev/best-practices/security#httpclient-xsrf-csrf-security)
- [@article@How can you protect Angular Web app from cross site request forgery?](https://www.linkedin.com/advice/3/how-can-you-protect-angular-web-app-from-cross-site-pyqwc)
- [@article@Cross Site Request Forgery: XSRF protection in Angular](https://borstch.com/blog/development/cross-site-request-forgery-xsrf-protection-in-angular)
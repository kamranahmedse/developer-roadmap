# Sanitization

Sanitization is the inspection of an untrusted value, turning it into a value that's safe to insert into the DOM. In many cases, sanitization doesn't change a value at all. Sanitization depends on context: A value that's harmless in CSS is potentially dangerous in a URL.

Angular sanitizes untrusted values for HTML and URLs. Sanitizing resource URLs isn't possible because they contain arbitrary code. In development mode, Angular prints a console warning when it has to change a value during sanitization.

Visit the following resources to learn more:

- [@official@Sanitization and Security Contexts](https://angular.dev/best-practices/security#sanitization-and-security-contexts)

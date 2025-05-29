# Cross-site Scripting

Cross-site scripting (XSS) enables attackers to inject malicious code into web pages. Such code can then, for example, steal user and login data, or perform actions that impersonate the user.
This has been one of the biggest web security vulnerabilities for over a decade. To systematically block XSS bugs, Angular treats all values as untrusted by default. When a value is inserted into the DOM from a template binding, or interpolation, Angular sanitizes and escapes untrusted values.

Visit the following resources to learn more:

- [@official@Preventing cross-site Scripting (XSS)](https://angular.dev/best-practices/security#preventing-cross-site-scripting-xss)
- [@article@Mitigate cross-site scripting (XSS)](https://web.dev/articles/strict-csp)
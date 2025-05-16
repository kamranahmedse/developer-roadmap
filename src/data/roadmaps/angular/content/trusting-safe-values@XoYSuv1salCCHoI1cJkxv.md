# Trusting Safe Values

Sometimes applications genuinely need to include executable code, display an `<iframe>` from some URL, or construct potentially dangerous URLs. To prevent automatic sanitization in these situations, tell Angular that you inspected a value, checked how it was created, and made sure it is secure. Do be careful. If you trust a value that might be malicious, you are introducing a security vulnerability into your application. If in doubt, find a professional security reviewer.

Visit the following resources to learn more:

- [@official@Trusting Safe Values](https://angular.dev/best-practices/security#trusting-safe-values)

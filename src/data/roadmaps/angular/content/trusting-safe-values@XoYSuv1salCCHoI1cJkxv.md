# Trusting Safe Values
Sometimes applications genuinely need to include executable code, display an `<iframe>` from some URL, or construct potentially dangerous URLs. To prevent automatic sanitization in these situations, tell Angular that you inspected a value, checked how it was created, and made sure it is secure. Do be careful. If you trust a value that might be malicious, you are introducing a security vulnerability into your application. If in doubt, find a professional security reviewer.

To mark a value as trusted, inject `DomSanitizer` and call one of the following methods:

* `bypassSecurityTrustHtml`
* `bypassSecurityTrustScript`
* `bypassSecurityTrustStyle`
* `bypassSecurityTrustUrl`
* `bypassSecurityTrustResourceUrl`

Example:
```ts
constructor(private sanitizer: DomSanitizer) {
    // javascript: URLs are dangerous if attacker controlled.
    // Angular sanitizes them in data binding, but you can
    // explicitly tell Angular to trust this value:
    this.dangerousUrl = 'javascript:alert("Hi there")';
    this.trustedUrl = sanitizer.bypassSecurityTrustUrl(this.dangerousUrl);
```
Visit the following resources to learn more:

- [@official@Angular Official Docs - Trusting safe values](https://angular.dev/best-practices/security#trusting-safe-values)

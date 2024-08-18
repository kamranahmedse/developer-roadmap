# XSS

Cross-site scripting (XSS) is a security vulnerability that affects web applications, allowing attackers to inject malicious scripts into web pages viewed by other users. These scripts can then be executed by the browsers of unsuspecting users who visit the compromised web page. The danger of XSS lies in its ability to access cookies, session tokens, and other sensitive information that the user's browser handles, potentially leading to unauthorized actions being performed on behalf of the user. 

## Types of XSS

- **Stored XSS**: occurs when a malicious script is permanently stored on a target server, such as in a database, message forum, visitor log, or comment field.

- **Reflected XSS**: The attack is called "reflected" because the malicious script is reflected off the web server, such as in an error message or search result, rather than being stored on the server.

- **DOM-based XSS** is a type of attack where the vulnerability exists in the client-side script itself rather than the server-side code.

## How to prevent XSS

 Prevention strategies involve a combination of validating and sanitizing input, employing security features of web frameworks, and implementing Content Security Policies (CSP). Techniques such as output encoding and HTML sanitization are essential to ensure that user-supplied data does not execute as code in browsers, thus mitigating potential attacks.

Visit the following resources to learn more:

- [@article@Cross Site Scripting (XSS) - OWASP](https://owasp.org/www-community/attacks/xss/)
= [@article@Cross Site Scripting Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
- [@video@Cross-site Scripting](https://www.youtube.com/watch?v=PKgw0CLZIhE)

# What is XSS
Cross-site scripting (XSS) is a type of security vulnerability that can be found in some web applications. It's a code injection attack that targets web applications, delivering malicious, client-side scripts to a user's web browser. XSS attacks enable attackers to inject malicious scripts into a website, which are then executed by the user's browser. This can lead to unauthorized access to sensitive data, session hijacking, and other malicious activities.

## Types of XSS:

- **Stored XSS:** Malicious script is stored on the server and executed when a user visits the site.
- **Reflected XSS:** Malicious script is reflected back to the user's browser through a vulnerable website.
- **DOM-based XSS:** Malicious script is injected into the website's DOM, allowing it to be executed by the browser.

### Impact:

- Can lead to unauthorized access to sensitive data, session hijacking, and other malicious activities.
- Severity depends on the nature of the application and the compromised user's privileges.

## Prevention:

- **Filter input:** Validate user input to prevent malicious scripts.
- **Encode output:** Encode user-controllable data to prevent it from being executed as code.
- **Use response headers:** Set headers to prevent browsers from interpreting responses as active content.
- **Content Security Policy:** Implement CSP as a last line of defense.

Visit the following resources to learn more:

- [@website@OWASP - XSS](https://owasp.org/www-community/attacks/xss/)
- [@article@PortSwigger - XSS](https://portswigger.net/web-security/cross-site-scripting)

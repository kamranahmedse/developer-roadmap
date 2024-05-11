# CSRF

Cross-Site Request Forgery, or CSRF, is a type of attack that exploits the trust that a user's browser has in a web application. It tricks the user's browser into executing unwanted actions on a web application in which the user is currently authenticated.

## How CSRF Works

- A user logs into a vulnerable web application.
- The web application returns a cookie to the user's browser, indicating that the user is authenticated.
- The attacker creates a malicious link or embeds malicious HTML/JavaScript code on another website.
- The user, while still authenticated to the web application, visits the attacker's website, which triggers the malicious code.
- The attacker's code sends a request to the targeted web application, leveraging the user's authenticated cookie.
- The vulnerable web application performs the malicious action as if the request came from the user.

## Impact of CSRF Attacks

CSRF attacks can result in unauthorized actions being performed on a user's behalf, often without the user's knowledge. Consequences might include unauthorized:

- Data modifications
- Privilege escalation
- Account takeovers

## Prevention Measures

Here are some techniques to help prevent CSRF attacks:

- **Use CSRF Tokens:** Implement a unique, unpredictable token in each sensitive request (e.g., form submissions) to ensure that the request originates from the same domain.
- **Double-submit Cookies:** Generate a unique token for each session and include it as a hidden value in forms, then validate it against the corresponding session cookie.
- **SameSite Cookies:** Use the `SameSite` attribute in cookies to instruct the browser to only send the cookie when the request originates from the same domain.
- **Content Security Policy (CSP):** Implement a CSP header to mitigate cross-site scripting, which can be a vector for CSRF attacks.
- **Restrict CORS:** Limit Cross-Origin Resource Sharing (CORS) to trusted domains to prevent unauthorized communication between different origins.

By understanding and applying these preventive measures, the risk of CSRF attacks can be significantly reduced, enhancing the overall safety and security of web applications.

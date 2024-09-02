# Cross-site Request Forgery

Cross-site request forgery, also known as one-click attack or session riding and abbreviated as CSRF or XSRF, is a type of malicious exploit of a website or web application where unauthorized commands are submitted from a user that the web application trusts. There are many ways in which a malicious website can transmit such commands; specially-crafted image tags, hidden forms, and JavaScript fetch or XMLHttpRequests, for example, can all work without the user's interaction or knowledge. Unlike cross-site scripting (XSS), which exploits the trust a user has for a particular site, CSRF exploits the trust that a site has in a user's browser. In a CSRF attack, an innocent end user is tricked by an attacker into submitting a web request that they did not intend. This may cause actions to be performed on the website that can include inadvertent client or server data leakage, change of session state, or manipulation of an end user's account. Angular provides built-in protection against CSRF attacks through the `HttpClientXsrfModule` module. This module automatically adds a token to outgoing requests and validates it on the server side.

Visit the following resources to learn more:

- [@official@Angular Official Docs - Cross Site Request Forgery](https://angular.dev/best-practices/security#cross-site-request-forgery)
- [@official@HttpClientXsrfModule](https://angular.dev/api/common/http/HttpClientXsrfModule)
- [@video@Configure the CSRF Protection With Spring Security 6 and Angular](https://www.youtube.com/watch?v=tgjLsEmxcuY)
- [@video@Angular security - CSRF prevention using Double Submit Cookie](https://www.youtube.com/watch?v=lZfF4MOTeNM)

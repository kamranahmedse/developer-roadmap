# Cross-Site Request Forgery (CSRF)

Cross-Site Request Forgery (CSRF) is a type of web security vulnerability that allows an attacker to trick a user into performing actions on a web application without their consent. It occurs when a malicious website or link causes a user’s browser to send unauthorized requests to a different site where the user is authenticated, such as submitting a form or changing account settings. Since the requests are coming from the user’s authenticated session, the web application mistakenly trusts them, allowing the attacker to perform actions like transferring funds, changing passwords, or altering user data. CSRF attacks exploit the trust that a web application has in the user's browser, making it critical for developers to implement countermeasures like CSRF tokens, same-site cookie attributes, and user confirmation prompts to prevent unauthorized actions.

Learn more from the following resources:

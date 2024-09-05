# CSRF (Cross-Site Request Forgery) Attack

**Cross-Site Request Forgery (CSRF)** is a type of web security vulnerability that tricks a user into performing an unintended action on a web application in which they are authenticated. The attacker exploits the trust that a website has in the user's browser. This attack is dangerous because it works on users who are authenticated, allowing unauthorized actions to be executed.

## How CSRF Attack Works

1. **Victim logs into a trusted website** (e.g., a banking site).
2. **Attacker lures the victim** into visiting a malicious website while they are still logged into the trusted site.
3. **Malicious request is executed** in the background by the victim’s browser without the victim realizing it. Since the victim is logged in, the trusted website processes the request as if it was a legitimate action.

## Example of CSRF Attack

Let’s consider an example using a banking website.

### Scenario:

1. The victim logs into their bank's website, `https://www.victim-bank.com`, and has an active session.
2. The victim is tricked by the attacker into clicking a link or visiting a malicious website (e.g., `https://malicious-website.com`).
3. The malicious website contains hidden code that sends a request to the bank’s website to transfer money from the victim’s account to the attacker’s account.

### Malicious HTML Code:

```html
<img src="https://www.victim-bank.com/transfer?toAccount=attacker&amount=1000" style="display:none;">

### How the Attack Works:

1. The attacker’s page contains an image tag (<img>) with a src attribute pointing to the bank’s transfer URL.
2. When the victim visits the malicious site, their browser automatically sends a request to https://www.victim-bank.com/transfer?toAccount=attacker&amount=1000 because the victim is logged into the bank.
3. The browser includes the victim’s session cookies, making the bank’s server believe this is a legitimate request from the user.
4. As a result, the bank unknowingly transfers money from the victim’s account to the attacker’s account.

# Content Security Policy

> Send `Content-Security-Policy: default-src 'none'` header.

Sending the `Content-Security-Policy: default-src 'none'` header is a security best practice that helps prevent cross-site scripting (XSS) attacks. This header tells the browser to not allow any resources to be loaded from external sources, such as scripts, stylesheets, or images. It only allows resources that are explicitly whitelisted in the CSP header, such as scripts or stylesheets hosted on your own domain. This can help prevent malicious actors from injecting code into your web pages via XSS attacks, as the browser will not execute any scripts or load any resources that are not explicitly allowed by the CSP policy.

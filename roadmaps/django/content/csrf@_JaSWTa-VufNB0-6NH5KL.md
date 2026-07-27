# CSRF

CSRF (Cross-Site Request Forgery) is a web security vulnerability where a malicious website tricks a user's browser into performing actions on a trusted site without the user's knowledge. In Django forms, CSRF protection works by including a unique, secret token in each form. When the form is submitted, Django verifies that this token matches the one stored in the user's session. If they don't match, the request is rejected, preventing the attacker from forging requests.

Visit the following resources to learn more:

- [@official@Cross Site Request Forgery protection](https://docs.djangoproject.com/en/6.0/ref/csrf/)
- [@official@How to use Django’s CSRF protection](https://docs.djangoproject.com/en/6.0/howto/csrf/)
- [@article@Django CSRF Protection Guide: Examples and How to Enable](https://www.stackhawk.com/blog/django-csrf-protection-guide/)
- [@video@What Is CSRF Token In Django and Why Is It Used?](https://www.youtube.com/watch?v=iJmezMBJqEs)
- [@video@Django - AJAX Requests, HTMX & CSRF Tokens](https://www.youtube.com/watch?v=lc1sOvRaFpg)
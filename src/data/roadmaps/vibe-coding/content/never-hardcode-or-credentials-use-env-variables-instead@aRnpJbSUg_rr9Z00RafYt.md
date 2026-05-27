# Always use env variables

API keys, passwords, and tokens should never appear directly in your code. Store them in a `.env` file using environment variables, and make sure that file is listed in `.gitignore` so it never gets pushed to GitHub accidentally.

Visit the following resources to learn more:

- [@article@Store Config in the Environment - The Twelve-Factor App](https://12factor.net/config)
- [@article@Secrets Management Cheat Sheet - OWASP](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html)
- [@article@What Are Hardcoded Secrets? Risks and Best Practices - Apiiro](https://apiiro.com/glossary/hardcoded-secrets/)
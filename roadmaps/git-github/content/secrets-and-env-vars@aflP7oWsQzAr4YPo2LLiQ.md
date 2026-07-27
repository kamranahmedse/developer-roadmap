# Secrets and Env Vars
 
Secrets store sensitive values like API keys or passwords securely, configured in a repository's settings and referenced in workflows without exposing their actual values in logs. Environment variables, defined with the `env` key, hold configuration values that steps in a workflow can access during execution. Both are commonly used together, keeping sensitive data out of the workflow file itself while still making it available where needed.

Visit the following resources to learn more:

- [@official@Using secrets in GitHub Actions](https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions)
- [@official@Store information in variables](https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/store-information-in-variables)
- [@video@Secrets and Environment Variables in your GitHub Action](https://www.youtube.com/watch?v=dPLPSaFqJmY)
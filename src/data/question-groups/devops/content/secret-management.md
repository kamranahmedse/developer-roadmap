There are many ways to handle secrets management in a DevOps pipeline, some of them involve:

- Storing secrets in environment variables managed by the CI/CD tool.
- Using secret management tools like HashiCorp Vault, AWS Secrets Manager, or Azure Key Vault to securely store and retrieve secrets. 
- Encrypted configuration files are also an option, with decryption keys stored securely somewhere else. 
- Whatever strategy you decide to go with, it's crucial to implement strict access controls and permissions, integrate secret management tools with CI/CD pipelines to fetch secrets securely at runtime, and above all, avoid hardcoding secrets in code repositories or configuration files.

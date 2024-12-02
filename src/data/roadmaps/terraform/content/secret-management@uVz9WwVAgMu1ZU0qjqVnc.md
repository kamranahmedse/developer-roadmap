# Secret Management

Terraform secret management is a critical aspect of secure infrastructure-as-code practices, focusing on the protection of sensitive information like API keys, passwords, and access tokens. Instead of storing secrets directly in Terraform files, best practices advocate for using external secret management systems such as HashiCorp Vault, AWS Secrets Manager, or Azure Key Vault. These systems allow Terraform to retrieve secrets securely during execution, significantly reducing the risk of exposure. For local development, tools like git-crypt or SOPS provide encryption for sensitive files, while Terraform's built-in encrypted state storage options safeguard secrets in state files. By marking variables as sensitive, accidental logging of secret values can be prevented. In CI/CD pipelines, it's crucial to inject secrets securely at runtime and avoid committing them to version control systems. Regular rotation of secrets and access audits further enhance security.

Learn more from the following resources:

- [@official@Inject Secrets with Vault](https://developer.hashicorp.com/terraform/tutorials/secrets)
- [@article@Terraform Secrets - How to manage them](https://spacelift.io/blog/terraform-secrets)
- [@article@A comprehensive guide to managing secrets in your Terraform code](https://blog.gruntwork.io/a-comprehensive-guide-to-managing-secrets-in-your-terraform-code-1d586955ace1)
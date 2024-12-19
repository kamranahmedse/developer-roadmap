# Sensitive Data

Terraform state files often contain sensitive data like passwords, API keys, and other secrets used in resource configurations. This data is stored in plaintext within the state file, posing a security risk if the file is compromised. To mitigate this, Terraform offers several approaches: marking variables as sensitive to prevent them from appearing in logs, using encrypted remote backends for state storage, implementing strict access controls on state files, and utilizing external secret management systems. It's crucial to treat state files as sensitive and secure them accordingly. For highly sensitive environments, some teams opt to store certain secrets outside of Terraform entirely, injecting them at runtime. Regularly auditing state files for sensitive information and implementing proper security measures is essential for maintaining the confidentiality of infrastructure secrets in Terraform deployments.

Learn more from the following resources:

- [@official@Sensitive data in state](https://developer.hashicorp.com/terraform/language/state/sensitive-data)
- [@official@Handling Sensitive Values in State](https://developer.hashicorp.com/terraform/plugin/best-practices/sensitive-state)
- [@video@Terraform — Protecting Sensitive Data](https://www.youtube.com/watch?v=yLc1YkB7DFo)
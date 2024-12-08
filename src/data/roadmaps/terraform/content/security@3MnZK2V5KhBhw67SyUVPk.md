# Security

Terraform security encompasses practices and tools to ensure the safe and compliant management of infrastructure-as-code. Key aspects include securing Terraform state files, which often contain sensitive information, by using encrypted remote backends. Access control is crucial, implementing least privilege principles for both human users and service accounts. Sensitive data management involves using vault systems or cloud-native secret managers rather than hardcoding credentials. Code review processes should include security checks, and automated scanning tools can be integrated to detect misconfigurations or policy violations. Implementing compliance-as-code with tools like Terraform Sentinel ensures adherence to organizational policies. Version control and proper git hygiene help maintain audit trails.

Visit the following resources to learn more:

- [@official@Terraform Security](https://www.terraform.io/cloud-docs/architectural-details/security-model)
- [@article@12 Terraform Security Best Practices](https://spacelift.io/blog/terraform-security)
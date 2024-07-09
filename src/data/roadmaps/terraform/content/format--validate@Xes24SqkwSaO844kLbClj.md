# Format & Validate

Terraform `format` and `validate` are two essential commands for maintaining clean and correct Terraform configurations:

- `terraform fmt` automatically formats Terraform configuration files to a consistent style. It adjusts indentation, aligns arguments, and sorts blocks and arguments. This command helps maintain code readability and consistency across team projects.

- `terraform validate` checks the syntax and internal consistency of Terraform configurations. It verifies that the configuration is syntactically valid, references are correct, and attribute names and types are appropriate. This command catches errors early in the development process, before attempting to apply changes to infrastructure.

You can learn more about these using the following resources

- [@article@Validate, format, lint, secure, and test Terraform IaC](https://tech.aabouzaid.com/2020/04/validate-format-lint-and-test-terraform-iac-ci.html)
- [@official@Terraform Validate - Documentation](https://developer.hashicorp.com/terraform/cli/commands/validate)
- [@official@Terraform Format - Documentation](https://developer.hashicorp.com/terraform/cli/commands/fmt)
- [@article@Terraform Validate Command – Validate Configuration Locally](https://spacelift.io/blog/terraform-validate)
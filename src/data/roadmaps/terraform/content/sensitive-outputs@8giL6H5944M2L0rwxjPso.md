# Sensitive Outputs

Terraform sensitive outputs are a feature used to protect sensitive information in Terraform configurations. When an output is marked as sensitive, Terraform obscures its value in the console output, displaying it as `<sensitive>` instead of the actual value. This is crucial for protecting sensitive data like passwords or API keys.

To mark an output as sensitive, use the sensitive argument in the output block:

```hcl
output "database_password" {
  value     = aws_db_instance.example.password
  sensitive = true
}
```

Sensitive outputs are still accessible programmatically and are written to the state in clear text, but their values are hidden in logs and the console to prevent accidental exposure. This feature helps maintain security when sharing Terraform configurations or outputs with team members or in CI/CD pipelines.

Learn more from the following resources:

- [@article@How to output sensitive data in Terraform](https://support.hashicorp.com/hc/en-us/articles/5175257151891-How-to-output-sensitive-data-with-Terraform)
- [@official@Suppressing values in CLI output](https://developer.hashicorp.com/terraform/language/values/outputs#sensitive-suppressing-values-in-cli-output)

# Output Syntax

Terraform output syntax is used to define values that should be made accessible after applying a Terraform configuration. The basic syntax is:

```hcl
output "name" {
  value = expression
  description = "Optional description"
  sensitive = bool
}
```

`name` is a unique identifier for the output. `value` is the expression whose result will be output. `description` is optional and provides context. `sensitive` is a boolean flag to mark sensitive data.

Learn more from the following resources:

- [@official@Hashicorp Output Tutorial](https://developer.hashicorp.com/terraform/tutorials/configuration-language/outputs)
- [@official@Declaring an Output Value](https://developer.hashicorp.com/terraform/language/values/outputs#declaring-an-output-value)
- [@article@Terraform Output Values : Complete Guide & Examples](https://spacelift.io/blog/terraform-output)
- [@article@Terraform: Output a field from a module](https://stackoverflow.com/questions/47034515/terraform-output-a-field-from-a-module)

# Local Values

Local values can be understood as a name assigned to any expression to use it multiple times directly by the name in your terraform module. Local values are referred to as locals and can be declared using the `locals` block. Local values can be a literal constants, resource attributes, variables, or other local values. Local values are helpful to define expressions or values that you need to use multiple times in the module as it allows the value to be updated easily just by updating the local value. A local value can be accessed using the `local` argument like `local.<value_name>`.

Learn more from the following resources:

- [@official@Local Values](https://developer.hashicorp.com/terraform/language/values/locals)
- [@article@Terraform Locals](https://spacelift.io/blog/terraform-locals)

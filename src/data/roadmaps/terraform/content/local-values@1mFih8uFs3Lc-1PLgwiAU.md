# Local Values

In Terraform, locals are a way to define and manage local values within a configuration. These local values are essentially temporary variables that are scoped to the module in which they are defined. They are useful for simplifying and reducing redundancy in the configuration by allowing you to reuse common values, perform calculations, and define complex expressions that can be referenced multiple times within the same module.

Key Points About Locals in Terraform:
Definition: Locals are defined using the locals block, where each local value is given a name and an associated expression.

Scope: Local values are scoped to the module in which they are defined and are not accessible outside of that module.

Usage: Once defined, local values can be referenced using the syntax local.<name>. This allows you to use them in resource arguments, variable values, and other expressions within the same module.

Immutability: Local values are immutable. Once they are defined, their value cannot be changed within the module's scope.

Article - https://spacelift.io/blog/terraform-locals

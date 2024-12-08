# show

The terraform show command displays a human-readable view of the current state or a saved plan file. When used without arguments, it presents the current state of the managed infrastructure, including all resources and their attributes. If given a path to a saved plan file, it shows the changes that would be made by applying that plan. This command is useful for inspecting the current state of your infrastructure, verifying the details of specific resources, or reviewing planned changes before applying them. It provides a comprehensive overview of your Terraform-managed resources, making it valuable for debugging, auditing, and understanding the current state of your infrastructure. The output includes sensitive information if present, so care should be taken when sharing or displaying the results in unsecured environments.

Learn more from the following resources:

- [@official@Terraform show](https://developer.hashicorp.com/terraform/cli/commands/show)
- [@official@Terraform state show](https://developer.hashicorp.com/terraform/cli/commands/state/show)
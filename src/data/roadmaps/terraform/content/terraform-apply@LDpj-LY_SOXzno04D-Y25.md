# terraform apply

`terraform apply` is the command used to implement the changes defined in your Terraform configuration files. It creates, updates, or deletes the specified infrastructure resources to match the desired state. Before making changes, it shows a plan similar to terraform plan and prompts for confirmation, unless the -auto-approve flag is used. Apply updates the state file to reflect the current infrastructure state, enabling Terraform to track and manage resources over time. It handles dependencies between resources, creating them in the correct order.

Learn more from the following resoureces:

- [@official@Terraform Apply Documentation](https://developer.hashicorp.com/terraform/cli/commands/apply)
- [@course@Apply Terraform configuration](https://developer.hashicorp.com/terraform/tutorials/cli/apply)
- [@article@Terraform Apply Command: Options, Examples and Best Practices](https://www.env0.com/blog/terraform-apply-guide-command-options-and-examples)
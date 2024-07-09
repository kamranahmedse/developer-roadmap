# terraform destroy

terraform destroy is a command used to remove all resources managed by a Terraform configuration. It creates a plan to delete all resources and prompts for confirmation before execution. This command is useful for cleaning up temporary environments or decommissioning entire infrastructures. It removes resources in the reverse order of their dependencies to ensure proper teardown. While powerful, terraform destroy should be used cautiously, especially in shared or production environments, as it can lead to data loss if not carefully managed. It's often used in conjunction with terraform state commands for more granular control over resource removal. After destruction, Terraform updates the state file to reflect the changes, but it's important to manage or remove this file if the project is being completely decommissioned.

Learn more from the following resources:

- [@official@Terraform Destroy Documentation](https://developer.hashicorp.com/terraform/cli/commands/destroy)
- [@article@How to destroy Terraform resources](https://spacelift.io/blog/how-to-destroy-terraform-resources)
- [@course@Destroy infrastructure](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/aws-destroy)
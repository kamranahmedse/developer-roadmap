# Clean Up

Cleaning up after using Terraform involves removing the infrastructure resources created and managing the associated state. The primary command for this is `terraform destroy`, which deletes all resources managed by the current Terraform configuration. It shows a destruction plan and requires confirmation before proceeding. After destruction, you should remove or archive the state files if they're no longer needed. For partial cleanup, you can remove specific resources from the state using `terraform state rm` and then run `terraform apply` to delete them. It's crucial to ensure all resources are properly removed to avoid unnecessary costs and security risks. Always review the destruction plan carefully, especially in shared or production environments, to prevent accidental deletion of critical resources.

Learn more from the following resources:

- [@article@How to Destroy Terraform Resources](https://spacelift.io/blog/how-to-destroy-terraform-resources)
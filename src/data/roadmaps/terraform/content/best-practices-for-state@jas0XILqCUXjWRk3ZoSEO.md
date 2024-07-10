# Best Practices for State

Terraform state best practices focus on security, consistency, and collaboration. 

- Store state files remotely in encrypted, version-controlled backends like S3 or Terraform Cloud to enable team access and enhance security.
- Implement state locking to prevent concurrent modifications. Use workspaces or separate state files for different environments.
- Regularly back up state files and enable versioning for rollback capabilities.
- Avoid storing sensitive data directly in state; instead, use secret management tools.
- Keep state files separate from your Terraform configuration in version control. 
- Utilize state subcommands for maintenance and troubleshooting. Implement access controls to restrict state file access.
- Regularly review and clean up unused resources in the state. 

These practices help maintain a secure, efficient, and manageable Terraform workflow, especially in team environments and complex infrastructures.

Learn more from the following resources:

- [@article@Managing Terraform State – Best Practices & Examples](https://spacelift.io/blog/terraform-state)
- [@article@Best Practices for Terraform State File Management](https://www.cloudthat.com/resources/blog/best-practices-for-terraform-state-file-management)
- [@video@Managing Terraform State Files - What are your options?](https://www.youtube.com/watch?v=keiIyarEKf8)
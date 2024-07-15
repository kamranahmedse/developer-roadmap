# VCS Integration

HCP's Version Control System (VCS) integration, particularly in Terraform Cloud, enables seamless connection between infrastructure code repositories and HCP services. This feature allows teams to directly link their Git repositories (from providers like GitHub, GitLab, or Bitbucket) to HCP workspaces. When configured, changes pushed to the linked repository automatically trigger Terraform runs in the corresponding workspace. This integration supports GitOps workflows, ensuring that infrastructure changes go through proper version control processes. It enables features like automatic plan generation on pull requests, providing early feedback on proposed changes. The integration also supports branch-based workflows, allowing different branches to be linked to different workspaces for staging and production environments.

Learn more from the following resources:

- [@official@Connecting VCS Providers to HCP Terraform](https://developer.hashicorp.com/terraform/cloud-docs/vcs)
- [@official@Use VCS-driven workflow](https://developer.hashicorp.com/terraform/tutorials/cloud-get-started/cloud-vcs-change)
- [@official@Configuring Workspace VCS Connections](https://developer.hashicorp.com/terraform/cloud-docs/workspaces/settings/vcs)
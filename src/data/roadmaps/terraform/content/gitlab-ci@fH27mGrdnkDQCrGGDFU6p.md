# GitLab CI

Using Terraform with GitLab CI enables automated infrastructure management within GitLab's CI/CD pipeline. A typical GitLab CI pipeline for Terraform includes stages for validation, planning, and applying changes. The pipeline can be configured to run Terraform commands automatically on code pushes or merge requests. GitLab CI variables are used to store sensitive information like cloud credentials securely. GitLab's native features like environments and approvals can be leveraged to manage different deployment stages and control when changes are applied.

Learn more from the following resources:

- [@official@Infrastructure as Code with Terraform and GitLab](https://docs.gitlab.com/ee/user/infrastructure/iac/)
- [@article@How to Implement GitLab CI/CD Pipeline with Terraform](https://spacelift.io/blog/gitlab-terraform)
- [@video@Automate deploying to AWS using Terraform with GitLab CICD pipeline](https://www.youtube.com/watch?v=oqOzM_WBqZc)
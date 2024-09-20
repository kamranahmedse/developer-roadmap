![Explain the concept of IaC](https://assets.roadmap.sh/guest/infrastructure-as-code-with-terraform-fbhi6.png)

IaC (Infrastructure as Code) is all about managing infrastructure through code, instead of using other more conventional configuration methods. Specifically in the context of Terraform, here is how you’d want to approach IaC:

- **Configuration Files**: Define your infrastructure using HCL or JSON files.
- **Execution Plan**: Generate a plan showing the changes needed to reach the desired state.
- **Resource Provisioning**: Terraform will then apply the plan to provision and configure desired resources.
- **State Management**: Terraform then tracks the current state of your infrastructure with a state file.
- **Version Control**: Finally, store the configuration files in a version control system to easily version them and share them with other team members.
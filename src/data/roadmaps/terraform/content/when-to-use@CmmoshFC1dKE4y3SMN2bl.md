# When to Use?

Provisioners in Terraform should be used judiciously, primarily when other declarative options are insufficient. They're appropriate for tasks that can't be accomplished through Terraform's resource configurations or data sources. Common scenarios include running initialization scripts on newly created servers, installing software not covered by provider-specific resources, or performing one-time setup tasks. Provisioners are useful for bootstrapping configuration management tools or handling complex, stateful operations that Terraform can't manage directly. However, they should be considered a last resort due to their potential to make Terraform runs less predictable and harder to manage. Whenever possible, prefer using cloud-init scripts, custom images, or separate configuration management tools. When provisioners are necessary, design them to be idempotent and resilient to failures to maintain Terraform's desired state consistency.

Learn more from the following resources:

- [@article@Why You should Use Terraform Provisioners as a Final Option](https://thomasthornton.cloud/2023/05/11/my-thoughts-on-why-you-should-use-terraform-provisioners-as-a-final-option/)
- [@article@Why Terraform Provisioners Are The Last Resort?](https://k21academy.com/terraform-iac/terraform-provisioners/)
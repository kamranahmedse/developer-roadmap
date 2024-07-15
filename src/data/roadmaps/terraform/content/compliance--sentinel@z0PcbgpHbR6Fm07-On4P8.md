# Compliance / Sentinel

Hashicorp Sentinel is a policy-as-code framework integrated with HashiCorp's enterprise products, including Terraform Cloud and Terraform Enterprise. It allows organizations to define and enforce standardized, fine-grained policies across their infrastructure deployments. Sentinel policies can be written to check for security compliance, cost management, or operational best practices before Terraform applies any changes. These policies use a domain-specific language to define rules that evaluate Terraform plans and state, enabling teams to catch potential issues early in the development process. Sentinel can enforce mandatory policies that prevent non-compliant infrastructure changes from being applied, or advisory policies that warn but don't block deployments.

Learn more from the following resources:

- [@official@Terraform and Sentinel](https://developer.hashicorp.com/sentinel/docs/terraform)
- [@article@Enforce policy-as-code](https://www.terraform.io/use-cases/enforce-policy-as-code)
- [@opensource@hashicorp/terraform-sentinel-policies](https://github.com/hashicorp/terraform-sentinel-policies)
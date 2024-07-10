# State

Terraform state is a crucial concept in Terraform that tracks the current state of your managed infrastructure. It's typically stored in a file named terraform.tfstate, which maps real-world resources to your configuration. This state allows Terraform to determine which changes are necessary to achieve the desired configuration. It contains sensitive information and should be stored securely, often in remote backends like S3 or Terraform Cloud. The state can be manipulated using terraform state commands for tasks like moving resources between states or removing resources from management. Proper state management is essential for collaborative work, ensuring consistency across team members and enabling Terraform to accurately plan and apply changes to your infrastructure.

Learn more from the following resources:

- [@official@State](https://developer.hashicorp.com/terraform/language/state)
- [@article@Purpose of Terraform state](https://developer.hashicorp.com/terraform/language/state/purpose)
- [@video@Managing Terraform state files](https://www.youtube.com/watch?v=UDBVCzg2IRo)
# Resource Lifecycle

Each Terraform resource is subject to the lifecycle: Create, Update or Recreate, Destroy. When executing `terraform apply`, each resource:
* which exists in configuration but not in state is created
* which exists in configuration and state and has changed is updated
* which exists in configuration and state and has changed, but cannot updated due to API limitation is destroyed and recreated
* which exists in state, but not (anymore) in configuration is destroyed

The lifecycle behaviour can be modified to some extend using the `lifecycle` meta argument.

Learn more from the following resources:

- [@official@How Terraform Applies a Configuration](https://developer.hashicorp.com/terraform/language/resources/behavior#how-terraform-applies-a-configuration)
- [@official@The lifecycle Meta-Argument](https://developer.hashicorp.com/terraform/language/meta-arguments/lifecycle)
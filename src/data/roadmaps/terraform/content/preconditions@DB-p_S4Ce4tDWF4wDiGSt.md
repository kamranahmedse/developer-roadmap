# Preconditions

Terraform preconditions are declarative checks within resource or data blocks that validate configuration or state before Terraform attempts to create or modify resources. They use condition arguments to specify logical tests and `error_message` arguments for custom failure notifications. Preconditions help catch misconfigurations early, enforce business rules, and ensure dependencies are met before resource operations.

Learn more from the following resources:

- [@official@Custom Condition Checks](https://developer.hashicorp.com/terraform/language/values/outputs#custom-condition-checks)
- [@video@Using Precondition and Post-condition Blocks in Terraform](https://www.youtube.com/watch?v=55ZLu8tSnvk)

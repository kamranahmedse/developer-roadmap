# Inspect / Modify State

Terraform provides tools to inspect and modify state, enabling management of tracked resources without altering the actual infrastructure. These capabilities allow users to view the current state in human-readable format, list all resources in the state, and obtain detailed information on specific resources. For state modification, Terraform offers methods to move resources within the state or to different state files, remove resources from state without deleting the actual resource, and update the state to match real-world infrastructure. These tools are crucial for reconciling discrepancies between Terraform's state and actual infrastructure, and for managing resources across different Terraform configurations or workspaces. However, state modifications should be performed cautiously, as improper changes can lead to inconsistencies between the state and the actual infrastructure.

Visit the following resources to learn more:

- [@official@Inspecting State](https://developer.hashicorp.com/terraform/cli/state/inspect)
- [@article@How to Manage Terraform State: A Step-by-Step Guide](https://meriemterki.medium.com/how-to-manage-terraform-state-a-step-by-step-guide-b615bd6ee0de)
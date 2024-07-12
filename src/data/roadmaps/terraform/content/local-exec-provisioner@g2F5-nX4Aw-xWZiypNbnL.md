# local-exec provisioner

The local-exec provisioner in Terraform allows the execution of local commands on the machine running Terraform after a resource is created. It's useful for tasks that need to be performed locally rather than on the remote resource. This provisioner can run scripts, update local files, or trigger local processes based on the creation of cloud resources. Common use cases include updating local inventories, triggering local notifications, or running local scripts that interact with the newly created resources. While powerful, it should be used judiciously as it can make Terraform operations dependent on the local environment. The local-exec provisioner doesn't affect the resource itself and isn't tracked in Terraform's state, so it's important to design these commands to be idempotent. It's best suited for simple, local operations that don't require complex error handling or state management.

Learn more from the following resources:

- [@official@local-exec Provisioner](https://developer.hashicorp.com/terraform/language/resources/provisioners/local-exec)
- [@video@Terraform - Local exec](https://www.youtube.com/watch?v=2dVq8L2LBc0)
- [@article@Local-Exec Provisioner](https://learning-ocean.com/tutorials/terraform/terraform-local-exec-provisioner/)

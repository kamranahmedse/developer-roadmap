# state pull / push

The `terraform state pull` and `terraform state push` commands are used for managing Terraform state in remote backends. The `pull` command retrieves the current state from the configured backend and outputs it to stdout, allowing for inspection or backup of the remote state. It's useful for debugging or for performing manual state manipulations.

The `push` command does the opposite, uploading a local state file to the configured backend, overwriting the existing remote state. This is typically used to restore a backup or to manually reconcile state discrepancies. Both commands should be used with caution, especially push, as they can potentially overwrite important state information.

Learn more from the following resources:

- [@official@Command - State pull](https://developer.hashicorp.com/terraform/cli/commands/state/pull)
- [@official@Command - State push](https://developer.hashicorp.com/terraform/cli/commands/state/push)
- [@article@Migrate Workspace State Using Terraform State Push / Pull](https://support.hashicorp.com/hc/en-us/articles/360001151948-Migrate-Workspace-State-Using-Terraform-State-Push-Pull)
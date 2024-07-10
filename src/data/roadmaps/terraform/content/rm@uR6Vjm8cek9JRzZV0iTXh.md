# rm

The terraform state rm command is used to remove resources from the Terraform state without destroying the actual infrastructure. This command is useful when you want to stop managing a resource with Terraform without deleting it, or when you need to move a resource to a different state file. It takes one or more resource addresses as arguments, specifying which resources to remove from state. After removal, Terraform will no longer track or manage these resources, but they will continue to exist in your infrastructure. This command should be used carefully, as it can create discrepancies between your Terraform configuration and the actual state of your infrastructure.

Learn more from the following resources:

- [@official@Terraform rm command](https://developer.hashicorp.com/terraform/cli/commands/state/rm)
- [@article@Terraform State Rm: How to Remove a Resource From State File](https://spacelift.io/blog/terraform-state-rm)
- [@video@How to remove resource from Terraform state file | terraform state rm example](https://www.youtube.com/watch?v=uK__Ls6an1c)
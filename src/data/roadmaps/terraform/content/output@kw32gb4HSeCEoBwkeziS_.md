# output

The terraform output command is used to extract the value of an output variable from the Terraform state. It allows you to view the values of outputs defined in your Terraform configuration after they have been applied. This command is useful for retrieving information about your infrastructure, such as IP addresses, resource IDs, or computed values, which can then be used in scripts or passed to other systems. When run without arguments, it displays all outputs. You can specify a particular output name to retrieve a specific value. The command supports different output formats, including JSON, making it easy to integrate with other tools or workflows. It's particularly valuable in CI/CD pipelines or when Terraform is used as part of a larger automation process.

Learn more from the following resources:

- [@official@Terraform output command](https://developer.hashicorp.com/terraform/cli/commands/output)
- [@article@Terraform output](https://learning-ocean.com/tutorials/terraform/terraform-output/)
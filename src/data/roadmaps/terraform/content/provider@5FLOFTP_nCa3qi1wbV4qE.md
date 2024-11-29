# provider

The `provider` meta-argument in Terraform specifies which provider configuration to use for a resource, overriding the default provider selection based on the resource type name. This is useful in scenarios where multiple configurations of the same provider are required, such as managing resources across different regions or environments. By setting the `provider` argument, you can ensure that the resource uses the specified provider setup, identified by its alias, enhancing control and flexibility in multi-provider or multi-region deployments. This meta-argument is essential for precisely directing Terraform on how to interact with the underlying infrastructure provider.

Learn more from the following resources:

- [@official@Terraform Docs - provider](https://developer.hashicorp.com/terraform/language/meta-arguments/resource-provider)
- [@article@Terraform by Example - provider](https://www.terraformbyexample.com/providers/)

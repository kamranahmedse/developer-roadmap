# -replace option in apply

The `-replace` flag in Terraform is used with the apply or plan command to force the replacement of a specific resource by tainting the resources. This flag instructs Terraform to delete and recreate the specified resource instead of updating it in place. It's useful when you need to regenerate a resource completely, such as when certain attributes can't be modified after creation. The flag is typically used when Terraform can't automatically detect that a resource needs replacement, or when you want to force a replacement for testing or troubleshooting purposes. While powerful, this flag should be used cautiously, especially with stateful resources, as it can lead to data loss. It's often employed in scenarios where in-place updates are not sufficient to achieve the desired configuration state of a resource.

Learn more from the following resources:

- [@official@Forcing Re-creation of Resources](https://developer.hashicorp.com/terraform/cli/state/taint)
- [@article@Terraform Taint, Untaint, Replace – How to Use It (Examples)](https://spacelift.io/blog/terraform-taint)
- [@video@Terraform Taint Is Bad Actually - Use Replace Instead](https://www.youtube.com/watch?v=v_T1fuYGjV0)
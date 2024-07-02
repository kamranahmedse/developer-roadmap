# count

The count meta-argument in Terraform allows you to specify the number of instances of a particular resource to create. By setting count to a numeric value, Terraform dynamically generates multiple instances of the resource, indexed from 0 to count-1. This is useful for managing infrastructure that requires multiple identical or similar resources, such as creating multiple virtual machines or storage buckets. Using count, you can conditionally create resources by setting the value based on variables or expressions, making your configurations more flexible and reducing redundancy. Each instance of the resource can be uniquely referenced using the count.index value, enabling more granular control and customization of each resource instance.

Note: You cannot delare count and for_each on the same resource.

Learn more from the following resources:

- [@official@Terraform Docs - count](https://developer.hashicorp.com/terraform/language/meta-arguments/count)
- [@article@Terraform by Example - count](https://www.terraformbyexample.com/count)
- [@video@Conditional blocks in Terraform using count](https://www.youtube.com/watch?v=RVoIqWkN_gI)

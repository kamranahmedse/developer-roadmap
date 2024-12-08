# Creation / Destroy Time

Creation and destroy-time provisioners in Terraform are used to execute actions at specific points in a resource's lifecycle. Creation-time provisioners run after a resource is created, while destroy-time provisioners run before a resource is destroyed. Creation-time provisioners are useful for tasks like initializing a newly created server, installing software, or configuring applications. Destroy-time provisioners are typically used for cleanup tasks, such as deregistering a server from a load balancer before deletion. Both types can be specified within a resource block. 

Creation-time provisioners that fail will cause the resource creation to fail, potentially leaving resources in an incomplete state. Destroy-time provisioners that fail don't prevent resource destruction but may leave external resources in an inconsistent state. Due to their potential impact on Terraform's ability to manage state consistently, both types should be used cautiously and designed to be idempotent and fault-tolerant.

Learn more from the following resources:

- [@official@Creation Time Provisioners](https://developer.hashicorp.com/terraform/language/resources/provisioners/syntax#creation-time-provisioners)
- [@official@Destroy Time Provisioners](https://developer.hashicorp.com/terraform/language/resources/provisioners/syntax#destroy-time-provisioners)
- [@official@How to: Terraform destroy time provisioners](https://support.hashicorp.com/hc/en-us/articles/11119084989587-How-to-Terraform-Destroy-time-Provisioners)
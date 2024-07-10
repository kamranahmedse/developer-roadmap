# Versioning

Terraform state versioning refers to the practice of maintaining multiple versions of the state file over time. While Terraform itself doesn't provide built-in versioning, it's typically achieved through backend configurations that support versioning, such as Amazon S3 with versioning enabled or Terraform Cloud. This approach allows teams to track changes, rollback to previous states if needed, and maintain an audit trail of infrastructure modifications. Versioning helps in recovering from accidental state corruptions or deletions, and in understanding the evolution of infrastructure over time. It's considered a best practice for production environments, enhancing disaster recovery capabilities and providing insights into infrastructure changes.

Learn more from the following resources:

- [@official@State Versions API](https://developer.hashicorp.com/terraform/cloud-docs/api-docs/state-versions)
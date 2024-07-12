# Data Sources

Terraform data sources allow retrieval of information from external systems or existing resources for use within Terraform configurations. They provide a way to query and fetch data that can be used in resource definitions, making configurations more dynamic and adaptable. Data sources don't create or manage resources; instead, they read existing data. Common uses include fetching AMI IDs, looking up IP ranges, or retrieving information about existing infrastructure components. Data sources are defined using data blocks in Terraform configuration files and can accept arguments to filter or specify the data being requested. They enable Terraform to integrate with existing infrastructure or external systems, facilitating more flexible and context-aware resource management.

Learn more from the following resources:

- [@official@Terraform data sources](https://developer.hashicorp.com/terraform/language/data-sources)
- [@article@Terraform Data Sources – How They Are Utilized](https://spacelift.io/blog/terraform-data-sources-how-they-are-utilised)
- [@video@Data Sources in Terraform](https://www.youtube.com/watch?v=Y92Q5nW5-5g)
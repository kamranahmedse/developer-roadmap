# Template Files

Terraform template files are a powerful feature for creating customizable, reusable configuration snippets. These files, typically with a `.tftpl` extension, contain placeholders that can be filled with variables at runtime. Terraform uses the `templatefile` function to process these files, replacing variables with actual values. This approach is useful for generating configuration files, scripts, or any text-based content that needs to be parameterized. Template files enhance modularity and reduce repetition in Terraform configurations. They're commonly used for creating user data scripts for EC2 instances, generating complex JSON configurations, or preparing any text-based resource that requires dynamic content. The `templatefile` function reads the contents of a file and renders its template syntax with a given set of variables, allowing for dynamic and flexible resource configurations.

Learn more from the following resources:

- [@official@templatefile function](https://developer.hashicorp.com/terraform/language/functions/templatefile)
- [@article@What are Terraform templates?](https://spacelift.io/blog/terraform-templates)
- [@video@Using templatefile in Terraform](https://www.youtube.com/watch?v=cRYYFCekOIk)
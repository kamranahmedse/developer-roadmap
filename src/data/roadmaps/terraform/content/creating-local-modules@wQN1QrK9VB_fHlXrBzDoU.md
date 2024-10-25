# Creating Local Modules

Creating local modules in Terraform involves organizing a set of related resources into a reusable package within your project. To create a local module, you typically create a new directory within your project structure and place Terraform configuration files (`.tf`) inside it. These files define the resources, variables, and outputs for the module. The module can then be called from your root configuration using a module block, specifying the local path to the module directory. Local modules are useful for encapsulating and reusing common infrastructure patterns within a project, improving code organization and maintainability. They can accept input variables for customization and provide outputs for use in the calling configuration. Local modules are particularly beneficial for breaking down complex infrastructures into manageable, logical components and for standardizing resource configurations across a project.

Learn more from the following resources:

- [@official@Build and use a local module](https://developer.hashicorp.com/terraform/tutorials/modules/module-create)
- [@article@How to create reusable infrastructure with Terraform modules](https://blog.gruntwork.io/how-to-create-reusable-infrastructure-with-terraform-modules-25526d65f73d)
- [@video@Creating a module in Terraform](https://www.youtube.com/watch?v=OeL2AlsdNaQ)
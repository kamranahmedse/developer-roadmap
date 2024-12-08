# Inputs / Outputs

Module inputs and outputs in Terraform facilitate the flow of data into and out of modules, enabling customization and data sharing. Inputs are defined using variable blocks within a module and allow the module's behavior to be customized when it's used. They can have default values and type constraints. 

When calling a module, inputs are provided as arguments. Outputs, defined using output blocks, expose specific values from the module's resources, making them available to the calling module. This allows for data to be passed between modules or to be used in other parts of the configuration. Outputs can include computed values, resource attributes, or any Terraform expression. Properly designed inputs and outputs are crucial for creating flexible, reusable modules that can be easily integrated into various configurations.

Learn more from the following resources:

- [@official@Accessing Module Output Values](https://developer.hashicorp.com/terraform/language/modules/syntax#accessing-module-output-values)

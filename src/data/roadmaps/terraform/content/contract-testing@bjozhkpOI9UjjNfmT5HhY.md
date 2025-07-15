# Contract Testing

Terraform contract testing focuses on verifying the interfaces and interactions between different modules or components of your infrastructure code. This approach ensures that modules work correctly together and adhere to expected input/output contracts. Contract tests typically validate that a module accepts the correct input variables, produces the expected outputs, and creates resources with the right attributes. They often involve setting up test fixtures with mock data or minimal real infrastructure. The goal is to catch integration issues early, such as mismatched variable types or unexpected resource configurations. Contract testing helps maintain consistency across module versions and ensures that changes to one module don't break dependent modules. This type of testing is particularly valuable in large, modular Terraform projects where multiple teams may be working on different components of the infrastructure.

Learn more from the following resources:

- [@official@Terraform Contract Tests](https://www.hashicorp.com/blog/testing-hashicorp-terraform#contract-tests)
- [@article@Contract Testing: An Introduction and Guide](https://www.blazemeter.com/blog/contract-testing#:~:text=Contract%20testing%20focuses%20on%20verifying,services%20that%20rely%20on%20it.)
- [@video@Contract testing for microservices is a must!](https://www.youtube.com/watch?v=Fh8CqZtghQw)

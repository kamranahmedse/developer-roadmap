# Declarative vs Imperative

When it comes to Infrastructure as Code (IaC), there are two fundamental styles: imperative and declarative. 

In **imperative IaC**, you specify a list of steps the IaC tool should follow to provision a new resource. You tell your IaC tool how to create each environment using a sequence of command imperatives. Imperative IaC can offer more flexibility as it allows you to dictate each step. However, this can result in increased complexity. Popular imperative IaC tools are Chef and Puppet

In **declarative IaC**, you specify the name and properties of the infrastructure resources you wish to provision, and then the IaC tool figures out how to achieve that end result on its own. You declare to your IaC tool what you want, but not how to get there. Declarative IaC, while less flexible, tends to be simpler and more manageable. Terraform is the most popular declarative IaC tool 

Visit the following resources to learn more:

- [@article@Infrastructure as Code: From Imperative to Declarative and Back Again](https://thenewstack.io/infrastructure-as-code-from-imperative-to-declarative-and-back-again/)
- [@article@Declarative vs Imperative Programming for Infrastructure as Code (IaC)](https://www.copado.com/resources/blog/declarative-vs-imperative-programming-for-infrastructure-as-code-iac)




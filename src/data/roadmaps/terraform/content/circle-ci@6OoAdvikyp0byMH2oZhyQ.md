# Circle CI

Integrating Terraform with CircleCI enables automated infrastructure management within CircleCI's continuous integration and deployment pipelines. This setup allows for consistent and repeatable infrastructure deployments alongside application code changes. In a typical CircleCI configuration, jobs are defined to run Terraform commands like init, plan, and apply. The workflow can include steps for checking out code, setting up Terraform, and managing state files. CircleCI's environment variables and contexts can be used to securely store and access sensitive data like cloud provider credentials. CircleCI's parallelism features can be leveraged for faster execution of Terraform in complex setups.

Learn more from the following resources:

- [@official@Deploy Infrastructure with Terraform and CircleCI](https://developer.hashicorp.com/terraform/tutorials/automation/circle-ci)
- [@opensource@CircleCI Terraform Orb](https://circleci.com/developer/orbs/orb/circleci/terraform)
- [@article@How I deployed terraform resources with CircleCI](https://medium.com/nerd-for-tech/how-i-deployed-terraform-resources-with-circleci-628aa29ed514)
# Authentication

HCP (HashiCorp Cloud Platform) authentication provides secure access management for its services, including Terraform Cloud. It utilizes a comprehensive identity and access management system that supports multiple authentication methods. These include username/password combinations, single sign-on (SSO) integration with popular identity providers, and API tokens for programmatic access. HCP supports SAML 2.0 for enterprise-grade SSO, allowing seamless integration with existing identity management systems. For machine-to-machine communication, HCP offers service principal authentication, enabling secure, automated interactions with HCP services. The platform also provides fine-grained role-based access control (RBAC), allowing administrators to define and manage user permissions across different resources and operations.

Learn more from the following resources:

- [@official@HCP Authentication](https://developer.hashicorp.com/hcp/docs/cli/commands/auth/login)
- [@official@Authenticate with HCP](https://registry.terraform.io/providers/hashicorp/hcp/latest/docs/guides/auth)
- [@opensource@hashicorp/hcp-auth-login](https://github.com/hashicorp/hcp-auth-action)
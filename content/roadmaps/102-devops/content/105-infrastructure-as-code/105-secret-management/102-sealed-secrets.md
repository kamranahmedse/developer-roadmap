# Sealed Secrets

Sealed Secrets is a tool for securely storing and managing secrets in a Kubernetes environment. It is developed and maintained by Bitnami and is available as open-source software.

In a Sealed Secrets workflow, secrets are encrypted using a public key and stored as sealed secrets in a Git repository. The sealed secrets can then be deployed to a Kubernetes cluster, where they are decrypted using a private key and made available to the applications and infrastructure that need them.

Sealed Secrets is designed to be highly secure and easy to use, with a range of features for managing secrets, including:

* Encryption: Sealed Secrets uses encryption algorithms and protocols, such as RSA, to securely store secrets.
* Access controls: Sealed Secrets supports role-based access controls and multi-factor authentication to ensure that only authorized users or systems can access secrets.
* Secret rotation: Sealed Secrets supports automatic secret rotation, allowing secrets to be regularly rotated to reduce the risk of unauthorized access.
* Auditing: Sealed Secrets provides auditing capabilities, allowing administrators to track and monitor access to secrets.

Sealed Secrets is commonly used in Kubernetes environments to securely store and manage secrets, and it is often used in conjunction with other tools, such as Helm, to automate the deployment and management of cloud-native applications.

<ResourceGroupTitle>Free Content</ResourceGroupTitle>
<BadgeLink colorScheme='blue' badgeText='Official Website' href='https://github.com/bitnami-labs/sealed-secrets'>Sealed Secrets - Bitnami</BadgeLink>

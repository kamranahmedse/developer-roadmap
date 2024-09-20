# Sealed Secrets

Sealed Secrets is a Kubernetes controller and tool that allows users to encrypt their Kubernetes Secrets into encrypted "SealedSecrets" that can be safely stored in public repositories or insecure environments. Developed by Bitnami, it addresses the challenge of managing sensitive information in Git-based workflows and cluster management. The controller running in the cluster decrypts SealedSecrets into regular Secrets, ensuring that the original, sensitive data never leaves the cluster. This approach enables secure, declarative management of secrets in Kubernetes environments, aligning with GitOps practices. Sealed Secrets uses asymmetric cryptography, where only the controller in the cluster has the private key to decrypt the secrets. This tool enhances security in Kubernetes deployments by allowing secrets to be version-controlled and managed alongside other Kubernetes resources without exposing sensitive data.

Visit the following resources to learn more:

- [@opensource@bitname/sealed-secrets](https://github.com/bitnami-labs/sealed-secrets)
- [@article@Sealed Secrets](https://fluxcd.io/flux/guides/sealed-secrets/)

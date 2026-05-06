# Sealed Secrets

Sealed Secrets is a Kubernetes-focused tool developed by Bitnami that lets you encrypt Kubernetes secrets so they can be safely stored in version control. A controller running in the cluster holds the decryption key and is the only entity able to decrypt and create the actual secrets at runtime.

Visit the following resources to learn more:

- [@opensource@bitname/sealed-secrets](https://github.com/bitnami-labs/sealed-secrets)
- [@article@Sealed Secrets](https://fluxcd.io/flux/guides/sealed-secrets/)
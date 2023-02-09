# Cluster Federation

Cluster Federation in Kubernetes is a feature that allows multiple individual Kubernetes clusters to be joined into a single, federated cluster. This enables administrators to manage multiple clusters as a single entity, providing a unified view and management of resources across multiple clusters.

Here's a simple explanation of the concept:

- Create multiple individual Kubernetes clusters, each with its own resources.
- Set up a federated control plane that acts as a central management system for the individual clusters.
- Use the federated control plane to manage and orchestrate resources across all the individual clusters.

Applications running on the individual clusters can be made available to other clusters through the federation, enabling cross-cluster communication and sharing of resources.

Learn more from the following links:

- [Kubernetes Federation Evolution](https://kubernetes.io/blog/2018/12/12/kubernetes-federation-evolution/)
- [Kubernetes Cluster Federation](https://www.youtube.com/watch?v=86jZdmAjWns)
# Evictions

Evictions terminate or delete running pods from a node due to reasons like resource constraints or pod failures. They can be initiated by the system or administrators manually through the API. Evictions can be graceful, allowing pods to clean up resources, or forceful, immediately terminating them. Kubernetes provides preemption and pod disruption budgets to handle evictions effectively and minimize service disruptions. Evictions are necessary to manage and maintain Kubernetes clusters, and Kubernetes provides tools to handle them.

Learn more from the following links:

- [@official@Node-pressure Eviction](https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/)
- [@official@API-initiated Eviction](https://kubernetes.io/docs/concepts/scheduling-eviction/api-eviction/)

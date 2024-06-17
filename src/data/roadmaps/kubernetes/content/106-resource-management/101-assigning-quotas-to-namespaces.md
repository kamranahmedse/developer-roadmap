# Assigning Quotas to Namespaces

Assigning quotas to namespaces is a way to limit resource usage for specific groups of resources in Kubernetes. Quotas can be set for CPU, memory, and other resources, as well as for the number of objects in a namespace. This can help ensure fair resource distribution across different teams or projects within a cluster. Quotas can be applied to individual namespaces or across the entire cluster. Kubernetes allows for both hard quotas, which enforce strict resource limits, and soft quotas, which allow for overages up to a certain point. Quotas can be managed using the Kubernetes API or through YAML configuration files.

Learn more from the following resources:

- [@official@Resource Quotas - Documentation](https://kubernetes.io/docs/concepts/policy/resource-quotas/)
- [@video@Kubernetes Namespaces Explained in 15 mins](https://www.youtube.com/watch?v=K3jNo4z5Jx8)
- [@article@Leveraging Namespaces for Cost Optimization with Kubernetes](https://thenewstack.io/leveraging-namespaces-for-cost-optimization-with-kubernetes/)

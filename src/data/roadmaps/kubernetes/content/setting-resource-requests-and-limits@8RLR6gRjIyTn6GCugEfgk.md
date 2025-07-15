# Setting Resource Requests and Limits

Resource requests and limits in Kubernetes specify the minimum and maximum amount of CPU and memory a container requires to run. Resource requests are used for scheduling containers on nodes with sufficient resources, while limits enforce resource quotas and prevent containers from consuming too much. These settings can be configured at the pod or container level using the resources field in YAML. It's important to set resource requests and limits correctly to ensure optimal resource utilization in your Kubernetes cluster.

Learn more from the following resources:

- [@official@Requests and limits - Documentation](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#requests-and-limits)
- [@official@Motivation for default memory limits and requests](https://kubernetes.io/docs/tasks/administer-cluster/manage-resources/memory-default-namespace/#motivation-for-default-memory-limits-and-requests)
- [@article@Understanding Kubernetes Resource Types](https://thenewstack.io/understanding-kubernetes-resource-types/)
- [@article@Kubernetes Requests and Limits Demystified ](https://thenewstack.io/kubernetes-requests-and-limits-demystified/)

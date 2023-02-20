# Horizontal pod autoscaler
Horizontal Pod Autoscaler (HPA) is a Kubernetes feature that automatically scales the number of replicas of a pod based on CPU utilization, memory utilization, or custom metrics. This ensures that the application can handle fluctuations in traffic and resource usage without being over-provisioned or under-provisioned.

When an HPA is created, it monitors the specified metric and compares it to the target value. If the current metric exceeds the target value, the HPA will increase the number of replicas of the pod, allowing the application to handle increased traffic or resource usage. Conversely, if the current metric falls below the target value, the HPA will reduce the number of replicas, conserving resources and reducing costs.

HPAs can be customized to scale based on a variety of metrics, including custom metrics that are specific to an application. They can also be combined with other Kubernetes features, such as the Cluster Autoscaler, to scale the entire cluster based on resource usage.

Overall, HPA is a powerful tool for managing the scalability and resource utilization of Kubernetes applications, ensuring that they can adapt to changing conditions and continue to operate efficiently.
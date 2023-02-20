# Vertical pod autoscaler
Vertical Pod Autoscaler (VPA) is a Kubernetes feature that automatically adjusts the resource requests and limits of containers in a pod based on their actual usage. Unlike the Horizontal Pod Autoscaler (HPA) which scales the number of pod replicas, the VPA scales the resources allocated to each pod.

When a VPA is created, it analyzes the historical resource utilization of the containers in the pod and recommends the optimal values for their CPU and memory requests and limits. These recommendations are based on a combination of the pod's historical usage patterns and the current state of the cluster.

If the VPA is enabled in the cluster, it continuously monitors the resource usage of the containers in the pod and adjusts the resource requests and limits as needed. This ensures that the containers have the appropriate amount of resources allocated to them, which can improve their performance and prevent resource exhaustion.

The VPA can be configured to work in one of two modes: "off-line" and "on-line". In "off-line" mode, the VPA generates resource recommendations for a pod, but does not automatically adjust the resources allocated to the containers. In "on-line" mode, the VPA automatically adjusts the resources allocated to the containers based on the recommendations.

Overall, the VPA is a powerful tool for optimizing the resource utilization of Kubernetes applications, ensuring that they have the resources they need to operate efficiently while minimizing waste and reducing costs.
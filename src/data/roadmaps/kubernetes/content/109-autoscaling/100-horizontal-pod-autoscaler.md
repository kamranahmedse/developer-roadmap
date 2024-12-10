# Horizontal Pod Autoscaler

It is a feature in Kubernetes that automatically scales the number of replicas of a pod based on the current demand for the workload it is running. The HPA controller monitors the CPU utilization or other metrics of the pod and adjusts the number of replicas of the pod to meet the specified target. This helps to ensure that the workload can handle increases in traffic and demand without overloading the resources of the cluster.

Learn more from the following resources:

- [@official@Horizontal Pod Autoscaling - Documentation](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/)
- [@article@All you need to know about HorizontalPodAutoscaler](https://aptakube.com/blog/hpa-horizontalpodautoscaler)
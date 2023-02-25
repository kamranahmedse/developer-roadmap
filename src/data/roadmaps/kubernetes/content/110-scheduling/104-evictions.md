# Evictions
In Kubernetes, evictions occur when a pod is terminated by the system due to various reasons, such as resource constraints, node maintenance, or node failures. Evictions are a way for the Kubernetes system to reclaim resources and ensure that workloads are distributed across available nodes.

Here are some common reasons for pod evictions:

* Resource constraints: If a pod exceeds the resource limits specified in its configuration, such as CPU or memory limits, the Kubernetes system may evict it to free up resources for other pods.

* Node maintenance: If a node is scheduled for maintenance or is being taken offline, the Kubernetes system may evict pods running on that node to ensure that workloads are distributed across other available nodes.

* Node failures: If a node fails, the Kubernetes system may evict pods running on that node to ensure that workloads are redistributed to other available nodes.

When a pod is evicted, the Kubernetes system sends a termination signal to the pod's containers, allowing them to gracefully shut down and release any resources they are using. The pod's status is updated to indicate that it is being evicted, and a new pod may be created on another node to maintain the desired replica count.

Here's an example of a pod eviction due to a resource constraint:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-pod
spec:
  containers:
  - name: my-container
    image: nginx
    resources:
      limits:
        memory: "2Gi"
        cpu: "2"
```
In this example, a pod is defined with a container running the `nginx` image and resource limits of 2 GB of memory and 2 CPU units. If the pod exceeds these limits, the Kubernetes system may evict it to free up resources for other pods.

Evictions are an important part of the Kubernetes system, allowing administrators to manage resource usage and ensure that workloads are distributed across available nodes. By understanding the reasons for pod evictions and how they are handled by the Kubernetes system, administrators can ensure the reliability and availability of their applications.
# Scheduling
Scheduling in Kubernetes refers to the process of assigning a pod to a node in the cluster to run. The Kubernetes scheduler is responsible for making these scheduling decisions based on a variety of factors, including resource availability, pod requirements, and node capacity.

When a pod is created, it is not immediately assigned to a node. Instead, the Kubernetes scheduler evaluates the pod's requirements, such as its requested CPU and memory resources, and selects a suitable node with sufficient capacity to run the pod. The scheduler also takes into account other factors, such as the node's proximity to other pods and data sources, to optimize the placement of the pod.

Kubernetes provides different scheduling strategies to support various use cases. Some of the most common strategies are:

* Node affinity/anti-affinity: This strategy allows pods to be scheduled on nodes that have or do not have certain labels or attributes.

* Node selectors: This strategy allows pods to be scheduled on nodes that match specific labels or attributes.

* Taints and tolerations: This strategy allows nodes to be "tainted" with a label that indicates that it cannot accept certain pods. Pods can be configured with "tolerations" that allow them to run on tainted nodes if necessary.

* Pod affinity/anti-affinity: This strategy allows pods to be scheduled on nodes that have or do not have certain pods or labels.

In addition to these strategies, Kubernetes also provides advanced scheduling features, such as custom schedulers and pod priority and preemption, that allow for more granular control over scheduling decisions.

Overall, scheduling is a critical component of Kubernetes that ensures efficient use of resources and optimal performance of applications running in the cluster.
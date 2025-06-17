# Scheduling Basics

Scheduling involves assigning pods to worker nodes based on criteria such as resource availability, labels, affinity/anti-affinity rules, taints, and tolerations. Pods are the smallest deployable units in k8s, consisting of one or more containers that share the same network namespace. The scheduler is responsible for assigning pods to nodes, while labels are used for matching. Affinity and anti-affinity rules dictate how pods are scheduled based on their relationships with other pods or nodes. QoS is used to prioritize pod scheduling based on their resource requirements.

Learn more from the following resources:

- [@official@Kubernetes Scheduler](https://kubernetes.io/docs/concepts/scheduling-eviction/kube-scheduler/)
- [@video@How Scheduling in Kubernetes Works](https://www.youtube.com/watch?v=0FvQR-0tK54)

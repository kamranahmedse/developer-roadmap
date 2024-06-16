# Pod Priorities

Pod priorities in Kubernetes determine the order in which pods are scheduled on nodes when there are competing demands for resources. Each pod is assigned a numeric priority value, with higher values indicating higher priority. The scheduler maximizes the total priority of scheduled pods while also considering node suitability, taints and tolerations, and affinity and anti-affinity rules. Priorities can be set manually or automatically based on business logic or application requirements. Priorities help ensure that critical workloads receive necessary resources and are scheduled first, while lower priority workloads are scheduled when resources become available.

Learn more from the following resources:

- [@official@Pod priority - Documentation](https://kubernetes.io/docs/concepts/scheduling-eviction/pod-priority-preemption/#pod-priority)
- [@video@Kubernetes Pod Priority (Examples)](https://www.youtube.com/watch?v=sR_Zmvme3-0)

# Topology Spread Constraints

Topology spread constraints ensure even distribution of pods across a cluster's topology. Constraints define rules for the number of pods of a certain type that can run on a given level, such as nodes, zones, or racks. These constraints can be customized to fit specific needs, such as ensuring that critical workloads are spread across multiple zones. They help prevent single points of failure and improve application resilience by preventing resource overloading and promoting balanced distribution of workloads. Constraints can be added using the Kubernetes API or command line interface.

Learn more from the following resources:

- [@official@Topology Spread Constraints](https://kubernetes.io/docs/concepts/scheduling-eviction/topology-spread-constraints/)
- [@video@Kubernetes | Topology Spread Constraints](https://www.youtube.com/watch?v=joRrWJ6bwvE)

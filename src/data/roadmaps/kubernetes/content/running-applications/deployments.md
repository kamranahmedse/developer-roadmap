# Deployments

A Deployment is a resource object for managing Pods and ReplicaSets via a declarative configuration, which define a desired state that describes the application workload life cycle, number of pods, deployment strategies, container images, and more. The Deployment Controller works to ensure the actual state matches desired state, such as by replacing a failed pod. Out of the box, Deployments support several deployment strategies, like "recreate" and "rolling update", however can be customized to support more advanced deployment strategies such as blue/green or canary deployments.

Visit the following resources to learn more:

- [@official@Deployments Documentation](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)
- [@video@Kubernetes Deployments | Deployment Strategies](https://youtu.be/lxc4EXZOOvE)
- [@article@Kubernetes Deployment: From Basic Strategies to Progressive Delivery
](https://codefresh.io/learn/kubernetes-deployment/)

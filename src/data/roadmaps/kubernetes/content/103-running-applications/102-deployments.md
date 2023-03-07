# Deployments

Deployments are a Kubernetes resource that provides declarative updates to applications hosted in Pods and ReplicaSets. By defining a _desired state_, the [Deployment Controller](https://kubernetes.io/docs/concepts/architecture/controller/) is able to make changes to the state of a deployment and maintain that state.

Behind the scenes, a Deployment creates a ReplicaSet to maintain a desired set of pods. Deployments can be used to deploy a set of pods, update them, rollback to an earlier deployment, and scale the number of pods.

Visit the following resources to learn more:

- [Deployments Documentation](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)
- [What is a Kubernetes deployment?](https://www.redhat.com/en/topics/containers/what-is-kubernetes-deployment)

There are many components involved, some of them are part of the master node, and others belong to the worker nodes.

Here’s a quick summary:

1. **Master Node Component**s:
- **API Server**: The front-end for the Kubernetes control plane, handling all RESTful requests for the cluster.
- **etcd**: A distributed key-value store that holds the cluster's configuration and state.
- **Controller** Manager: Manages various controllers that regulate the state of the cluster.
- **Scheduler**: Assigns workloads to different nodes based on resource availability and other constraints.
2. *Worker Node Components*:
- **Kubelet**: This is an agent that runs on each node, and it ensures that each container is running in a Pod.
- **Kube-proxy**: A network proxy that maintains network rules and handles routing for services.
- **Container Runtime**: This software runs containers, such as Docker, containerd, or CRI-O.
3. **Additional Components**:
- **Pods**: These are the smallest deployable units in Kubernetes; they consist of one or more containers.
- **Services**: Services define a logical set of Pods and a policy for accessing them, they’re often used for load balancing.
- **ConfigMaps and Secrets**: They manage configuration data and sensitive information, respectively.
- **Ingress**: It manages external access to services, typically through HTTP/HTTPS.
- **Namespaces**: They provide a mechanism for isolating groups of resources within a single cluster.
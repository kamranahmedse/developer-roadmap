# Cluster Networking

Cluster networking in Kubernetes refers to the communication between different components of a Kubernetes cluster, such as pods, services, and nodes. In order to understand how cluster networking works in Kubernetes, it's helpful to understand some basic concepts.

A pod is the smallest unit of deployment in Kubernetes, and it contains one or more containers. Pods have a unique IP address and can communicate with other pods through the network.

A service is a logical abstraction over a set of pods, and it provides a stable IP address and DNS name for those pods. Services allow communication between pods and external clients.

Nodes are the worker machines in a Kubernetes cluster, and they run the pods. Nodes communicate with each other and with the control plane components, such as the API server, to manage the cluster.

By default, Kubernetes uses the Container Network Interface (CNI) plugin to implement cluster networking. CNI plugins are responsible for allocating network addresses, creating network interfaces for pods, and setting up network routes.

Learn more from the following links:

- [Cluster Networking](https://kubernetes.io/docs/concepts/cluster-administration/networking/)
- [Kubernetes Networking](https://www.youtube.com/watch?v=OaXWwBLqugk)
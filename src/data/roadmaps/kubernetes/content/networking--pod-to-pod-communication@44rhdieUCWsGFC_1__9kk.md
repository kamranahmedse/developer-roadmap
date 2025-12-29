# Networking & Pod-to-Pod Communication

Kubernetes networking enables pods to communicate with each other across the cluster, regardless of which node they are running on. Every pod is assigned its own IP address, and Kubernetes follows a flat network model where all pods can directly communicate with each other without Network Address Translation (NAT).

Pod-to-pod communication is implemented by a **Container Network Interface (CNI)** plugin, such as Calico, Flannel, Cilium, or Weave. These plugins are responsible for IP address assignment, routing, and enforcing network policies. By default, all pod traffic is allowed, but **NetworkPolicies** can be used to control and restrict traffic between pods for security and isolation.

Reliable pod-to-pod networking is a core requirement for building distributed and microservices-based applications in Kubernetes.

Visit the following resources to learn more:

* [@official@Cluster Networking - Kubernetes Documentation](https://kubernetes.io/docs/concepts/cluster-administration/networking/)
* [@official@Network Policies - Kubernetes Documentation](https://kubernetes.io/docs/concepts/services-networking/network-policies/)
* [@article@Kubernetes Networking Explained](https://www.tigera.io/learn/guides/kubernetes-networking/)
* [@video@Kubernetes Networking Deep Dive](https://www.youtube.com/watch?v=t98ekMiz0hQ)

# Control Plane Installation

The control plane's components make global decisions about the cluster (for example, scheduling), as well as detecting and responding to cluster events (for example, starting up a new pod when a deployment's replicas field is unsatisfied). Control plane components can be run on any machine in the cluster. However, for simplicity, set up scripts typically start all control plane components on the same machine, and do not run user containers on this machine.

Learn more from the following resources:

- [@official@Initializing your control-plane node - Documentation](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/create-cluster-kubeadm/#initializing-your-control-plane-node)
- [@video@Tutorial - Install Control Plane Components](https://www.youtube.com/watch?v=IUwuyZ5ReF0)

# Configuring Nodes

Configuring nodes in Kubernetes involves setting up individual machines that will host the containers managed by a cluster. Following is the procedure to do so:

- Install a container runtime: In order to run containers, a node must have a container runtime installed, such as Docker or CRI-O.
- Install kubeadm, kubelet and kubectl: Kubeadm is a tool that helps you bootstrap a Kubernetes cluster. Kubelet is an agent that runs on each node and makes sure that containers are running as expected. Kubectl is a command-line tool for controlling the cluster.
- Join the node to the cluster: The node must be registered with the cluster so that it can receive instructions from the control plane components. You can do this by using the `kubeadm join` command, which you run on the node and pass it the join token and cluster discovery information that you got when you created the cluster.
- Assign labels and taints to nodes: Labels and taints are used to control which pods can run on a node. Labels are used to categorize nodes and taints are used to mark nodes as unschedulable for certain pods. You can assign labels and taints to a node using the `kubectl label` and `kubectl taint` commands.
- Monitor node health: It's important to monitor the health of your nodes to make sure they are running as expected and that the containers they host are healthy. You can monitor node health by using tools like `kubectl get nodes`, `kubectl describe node`, and Kubernetes Dashboard.

Learn more from the following links:

- [Nodes in Kubernetes](https://kubernetes.io/docs/concepts/architecture/nodes/)
- [Setup Kubernetes Master and Worker Node](https://www.youtube.com/watch?v=ftrAFHL6w2c)
# Key concepts terminologies
Here are some key concepts and terminologies related to Kubernetes:

* Node: A physical or virtual machine that runs containers and is managed by Kubernetes.

* Pod: The smallest deployable unit in Kubernetes. A pod contains one or more containers and is deployed to a node.

* Service: An abstraction that defines a logical set of pods and a policy by which to access them. Services provide a consistent IP address and DNS name for pods.

* Deployment: A higher-level object that manages the deployment of a set of pods. Deployments provide declarative updates, scaling, and rollback capabilities.

* Namespace: A virtual cluster that provides a scope for names. Namespaces can be used to isolate resources and provide a way to partition cluster resources.

* Label: A key-value pair that is attached to Kubernetes objects, such as pods and services. Labels are used to organize and select objects.

* Selector: A way to select Kubernetes objects based on their labels. Selectors are used by services to route traffic to pods.

* ReplicaSet: A higher-level object that manages a set of pods and ensures that a specified number of replicas are running at all times.

* Controller: A Kubernetes component that watches the desired state of objects and takes action to ensure that the actual state matches the desired state.

* Volume: A directory that is accessible to containers in a pod. Volumes can be used to store data or share files between containers.

These are just a few of the key concepts and terminologies in Kubernetes. Familiarizing yourself with these concepts is essential for understanding how Kubernetes works and how to effectively deploy and manage containerized applications on Kubernetes.
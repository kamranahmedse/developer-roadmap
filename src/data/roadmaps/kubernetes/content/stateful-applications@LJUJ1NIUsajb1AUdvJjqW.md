# Stateful Applications

In Kubernetes, storage is a key component for stateful applications, as these applications require persistent data storage that is available across multiple replicas of the application. Kubernetes provides several options for storage, including volumes, persistent volumes, and storage classes.

Volumes are the basic building blocks of storage in Kubernetes. A volume is a directory that is accessible to the container running the application, and it can be backed by different types of storage, such as a host directory, a cloud provider disk, or a network storage system. Volumes are created and managed by Kubernetes, and they can be mounted into containers as part of a pod definition.

Learn more from the following resources:

- [@official@Stateful Applications](https://kubernetes.io/docs/tutorials/stateful-application/)
- [@video@The basics of stateful applications in Kubernetes](https://www.youtube.com/watch?v=GieXzb91I40)

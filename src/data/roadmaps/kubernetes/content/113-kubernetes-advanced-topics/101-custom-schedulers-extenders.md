# Custom schedulers extenders
Custom schedulers and extenders are Kubernetes components that enable users to customize how Kubernetes schedules workloads onto worker nodes in a cluster.

A custom scheduler is a Kubernetes controller that overrides the default scheduling behavior of Kubernetes. It allows users to define their own scheduling logic based on custom criteria, such as node performance or application-specific requirements. Custom schedulers are typically written in Go using the Kubernetes client libraries and can be deployed as a Kubernetes deployment or as a standalone binary.

To use a custom scheduler, users can add a custom scheduler name to their pod specification. When a pod is created, the custom scheduler controller will evaluate the pod's requirements and select a suitable node for the pod based on the custom scheduling logic.

A custom scheduler extender is similar to a custom scheduler but allows users to customize the scheduling process by adding additional filters and priorities to the default Kubernetes scheduling process. Kubernetes provides a default scheduler extender, which can be extended by adding custom plugins. Custom scheduler extenders are typically written in Go using the Kubernetes client libraries and can be deployed as a Kubernetes deployment or as a standalone binary.

To use a custom scheduler extender, users can add custom scheduler extender name and URL to their pod specification. When a pod is created, the custom scheduler extender controller will evaluate the pod's requirements and select a suitable node for the pod based on the custom scheduling filters and priorities.

Custom schedulers and extenders enable users to customize the scheduling process in Kubernetes, allowing them to optimize workload placement based on their specific requirements.
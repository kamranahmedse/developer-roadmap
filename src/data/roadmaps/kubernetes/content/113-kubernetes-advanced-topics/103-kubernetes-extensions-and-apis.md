# Kubernetes extensions and apis
Kubernetes extensions and APIs provide users with additional functionality beyond the core Kubernetes API. Some common Kubernetes extensions and APIs include:

* Custom Resource Definitions (CRDs): As discussed earlier, CRDs allow users to define their own custom resources and extend the Kubernetes API.

* Kubernetes API server aggregation: This feature allows users to expose multiple Kubernetes APIs through a single API server. Aggregating APIs enables users to manage a cluster's custom resources and third-party APIs from a single control plane.

* API server admission controllers: Admission controllers allow users to intercept and modify API requests before they are persisted to the etcd database. This can be used to enforce custom policies or apply default values to API objects.

* Custom Metrics APIs: Custom Metrics APIs provide a way for users to collect and expose custom metrics from their applications and workloads. Custom metrics can be used to monitor application performance and make scaling decisions.

* Service Catalog: The Service Catalog is an extension that provides a way to expose external services, such as cloud services or third-party APIs, through the Kubernetes API. This enables users to manage external services using Kubernetes tools and APIs.

* API Server Aggregator Layer (ASAL): ASAL provides a way to expose Kubernetes APIs from multiple clusters through a single API server. This enables users to manage resources across multiple clusters using a single control plane.

* Kubernetes Operators: Kubernetes Operators are a way to package, deploy, and manage applications on Kubernetes using custom controllers. Operators provide a way to automate the management of complex stateful applications on Kubernetes.

These extensions and APIs provide users with a powerful set of tools for extending and customizing Kubernetes to meet their specific needs. By leveraging these features, users can create custom resources, manage external services, and automate the management of complex applications on Kubernetes.
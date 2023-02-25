# Custom controllers
Custom controllers are Kubernetes controllers that are designed to manage custom resources defined by users in Kubernetes. These controllers are built using the Kubernetes API server and the Kubernetes client libraries, and can be deployed within the Kubernetes cluster.

Custom controllers are used to automate the management of custom resources and to extend Kubernetes to support new types of resources. For example, a custom controller could be used to manage the deployment of a custom application, or to manage the lifecycle of a custom database.

To build a custom controller, developers typically use a Kubernetes client library, such as client-go, to interact with the Kubernetes API server. The controller is then registered with Kubernetes by creating a custom resource definition (CRD) that defines the new resource that the controller will manage.

Once the CRD is created, Kubernetes will automatically start sending events to the controller whenever a new resource is created or modified. The controller can then use the Kubernetes client library to retrieve and modify the resource as needed.

Custom controllers are often used in combination with other Kubernetes resources, such as custom resource definitions (CRDs), custom resource quotas (CRQs), and custom admission controllers (CACs), to provide a customized and automated deployment and management experience.

Overall, custom controllers provide a powerful way to extend the capabilities of Kubernetes and automate the management of custom resources, making it easier for users to deploy and manage complex applications and services within Kubernetes.
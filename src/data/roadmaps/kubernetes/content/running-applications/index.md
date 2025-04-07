# Running Applications

For running application in a Kubernetes cluster, you need to define Kubernetes objects such as Deployment or StatefulSet, Service, and ConfigMap or Secret using YAML files. The Deployment or StatefulSet defines the container image, container ports, and other settings. The Service provides a stable IP address and DNS name to access the application, while the ConfigMap or Secret contains configuration data or sensitive information. To deploy the application, use kubectl apply to create or update the Kubernetes objects. Kubernetes automatically manages the deployment, scaling, and networking of the application based on the YAML files. Monitoring and modification can be done through kubectl commands.

Learn more from the following link:

- [@official@Run Application - Documentation](https://kubernetes.io/docs/tasks/run-application/)
- [@video@Kubernetes Tutorial | Run & Deploy Spring Boot Application](https://www.youtube.com/watch?v=7o7e8OAAWyg)

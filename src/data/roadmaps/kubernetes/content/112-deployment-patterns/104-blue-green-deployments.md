# Blue Green Deployments

It is a deployment strategy used in Kubernetes for deploying new versions of an application by running two identical production environments, one with the current version (blue) and the other with the new version (green). After the green environment is fully tested, traffic is routed from the blue environment to the green environment, providing a seamless transition for users and avoiding any downtime or disruption. In Kubernetes, Blue-Green Deployments can be implemented using a variety of tools and techniques, including deployment strategies, traffic routing, and load balancing.

Learn more from the following resources:

- [@article@Create a Kubernetes Blue Green Deployment](https://developer.harness.io/docs/continuous-delivery/cd-execution/kubernetes-executions/create-a-kubernetes-blue-green-deployment/)
- [@video@Kubernetes - Blue/Green Deployments](https://www.youtube.com/watch?v=jxhpTGQ484Y)

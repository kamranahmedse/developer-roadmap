# Clusters / ECS Container Agents

In AWS, an ECS **Cluster** is a logical grouping of tasks or services. If you run tasks or create services, you do it inside a cluster, so it's a vital building block of the Amazon ECS infrastructure. It serves as a namespace for your tasks and services, as these entities cannot span multiple clusters. The Amazon ECS tasks that run in a cluster are fundamentally distributed across all the Container Instances within an ECS Cluster.

Visit the following resources to learn more:

- [@official@Clusters](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/clusters.html)
- [@official@ECS Container Agents](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-agent-config.html)

# Docker Networks

Docker networks enable containers to communicate with each other and with external systems, providing the necessary connectivity for microservices architectures. By default, Docker offers several network types such as bridge, host, and overlay, each suited for different use cases like isolated environments, high-performance scenarios, or multi-host communication. Using the Docker CLI, you can create, inspect, and manage networks with commands like `docker network create` to define custom networks, `docker network ls` to list existing networks, and `docker network connect` to attach a container to a network. This flexibility allows developers to control how containers interact, ensuring secure and efficient communication across distributed applications.

Visit the following resources to learn more:

- [@official@Docker Networks](https://docs.docker.com/network/)
- [@official@Docker Network Commands](https://docs.docker.com/engine/reference/commandline/network/)
- [@video@Docker Networking](https://www.youtube.com/watch?v=bKFMS5C4CG0)

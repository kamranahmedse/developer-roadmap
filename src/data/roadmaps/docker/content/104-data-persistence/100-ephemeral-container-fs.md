# Ephemeral FS

By default, the storage within a Docker container is ephemeral, meaning that any data changes or modifications made inside a container will only persist until the container is stopped and removed. Once the container is stopped and removed, all the associated data will be lost. This is because Docker containers are designed to be stateless by nature. This temporary or short-lived storage is called the "ephemeral container file system". It is an essential feature of Docker, as it enables fast and consistent deployment of applications across different environments without worrying about the state of a container.

Visit the following resources to learn more:

- [@official@Data Persistence - Docker Documentation](https://docs.docker.com/get-started/docker-concepts/running-containers/persisting-container-data/)
- [@video@Docker Concepts - Persisting container data](https://www.youtube.com/watch?v=10_2BjqB_Ls)

# Ephemeral FS

By default, the storage within a Docker container is ephemeral, meaning that any data changes or modifications made inside a container will only persist as long as the container is running. Once the container is stopped and removed, all the associated data will be lost. This is because Docker containers are designed to be stateless by nature.

This temporary or short-lived storage is called the "ephemeral container file system". It is an essential feature of Docker, as it enables fast and consistent deployment of applications across different environments without worrying about the state of a container.

## Ephemeral FS and Data Persistence

As any data stored within the container's ephemeral FS is lost when the container is stopped and removed, it poses a challenge to data persistence in applications. This is especially problematic for applications like databases, which require data to be persisted across multiple container life cycles.

To overcome these challenges, Docker provides several methods for data persistence, such as:

- **Volumes**: A Docker managed storage option, stored outside the container's FS, allowing data to be persisted across container restarts and removals.
- **Bind mounts**: Mapping a host machine's directory or file into a container, effectively sharing host's storage with the container.
- **tmpfs mounts**: In-memory storage, useful for cases where just the persistence of data within the life-cycle of the container is required.

Visit the following resources to learn more:

- [@official@Data Persistence - Docker Documentation](https://docs.docker.com/get-started/docker-concepts/running-containers/persisting-container-data/)

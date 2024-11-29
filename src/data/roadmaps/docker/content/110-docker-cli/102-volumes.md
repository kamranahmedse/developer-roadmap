# Docker Volumes

Docker volumes are persistent storage solutions used to manage and store data outside the container’s filesystem, ensuring data remains intact even if the container is deleted or recreated. They are ideal for storing application data, logs, and configuration files that need to persist across container restarts and updates. With the Docker CLI, you can create and manage volumes using commands like `docker volume create` to define a new volume, `docker volume ls` to list all volumes, and `docker run -v` to mount a volume to a specific container. This approach helps maintain data integrity, simplifies backup processes, and supports data sharing between containers, making volumes a core part of stateful containerized applications.

Visit the following resources to learn more:

- [@official@Docker Volumes](https://docs.docker.com/storage/volumes/)
- [@official@Docker Volume Commands](https://docs.docker.com/engine/reference/commandline/volume/)

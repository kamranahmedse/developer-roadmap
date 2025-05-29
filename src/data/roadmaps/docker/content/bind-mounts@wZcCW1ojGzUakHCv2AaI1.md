# Bind Mounts

Bind mounts have limited functionality compared to volumes. When you use a bind mount, a file or directory on the host machine is mounted into a container. The file or directory is referenced by its absolute path on the host machine. By contrast, when you use a volume, a new directory is created within Docker's storage directory on the host machine, and Docker manages that directory's contents.

Visit the following resources to learn more:

- [@official@Docker Bind Mounts](https://docs.docker.com/storage/bind-mounts/)

# Runtime Configuration Options

Runtime configuration options allow you to customize the behavior and resources of your Docker containers when you run them. These options can be helpful in managing container resources, security, and networking.

Here's a brief summary of some commonly used runtime configuration options:

- **CPU:** You can limit the CPU usage of a container with the `--cpus` and `--cpu-shares` options. `--cpus` limits the number of CPU cores a container can use, while `--cpu-shares` assigns relative share of CPU time for the container.

  ```bash
  docker run --cpus=2 --cpu-shares=512 your-image
  ```

- **Memory:** You can limit and reserve memory for a container using the `--memory` and `--memory-reservation` options. This can help prevent a container from consuming too many system resources.

  ```bash
  docker run --memory=1G --memory-reservation=500M your-image
  ```

- **User:** By default, containers run as the `root` user. To increase security, you can use the `--user` option to run a container as another user or UID.

  ```bash
  docker run --user 1000 your-image
  ```

- **Read-only root file system:** To prevent unwanted changes to the container file system, you can use the `--read-only` option to mount the root file system as read-only.

  ```bash
  docker run --read-only your-image
  ```

- **Publish Ports:** You can use the `--publish` (or `-p`) option to publish a container's ports to the host system. This allows external systems to access the containerized service.

  ```bash
  docker run -p 80:80 your-image
  ```

- **Hostname and DNS:** You can customize the hostname and DNS settings of a container using the `--hostname` and `--dns` options.

  ```bash
  docker run --hostname=my-container --dns=8.8.8.8 your-image
  ```

Visit the following resources to learn more:

- [@official@Docker Documentation](https://docs.docker.com/engine/reference/run/)

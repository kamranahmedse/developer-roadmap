# Runtime Configuration Options

Runtime configuration options allow you to customize the behavior and resources of your Docker containers when you run them. These options can be helpful in managing container resources, security, and networking. Here's a brief summary of some commonly used runtime configuration options:

### Resource Management

- **CPU:** You can limit the CPU usage of a container with the `--cpus` and `--cpu-shares` options. `--cpus` limits the number of CPU cores a container can use, while `--cpu-shares` assigns relative share of CPU time for the container.

  ```bash
  docker run --cpus=2 --cpu-shares=512 your-image
  ```

- **Memory:** You can limit and reserve memory for a container using the `--memory` and `--memory-reservation` options. This can help prevent a container from consuming too many system resources.

  ```bash
  docker run --memory=1G --memory-reservation=500M your-image
  ```

### Security

- **User:** By default, containers run as the `root` user. To increase security, you can use the `--user` option to run a container as another user or UID.

  ```bash
  docker run --user 1000 your-image
  ```

- **Read-only root file system:** To prevent unwanted changes to the container file system, you can use the `--read-only` option to mount the root file system as read-only.

  ```bash
  docker run --read-only your-image
  ```

### Networking

- **Publish Ports:** You can use the `--publish` (or `-p`) option to publish a container's ports to the host system. This allows external systems to access the containerized service.

  ```bash
  docker run -p 80:80 your-image
  ```

- **Hostname and DNS:** You can customize the hostname and DNS settings of a container using the `--hostname` and `--dns` options.

  ```bash
  docker run --hostname=my-container --dns=8.8.8.8 your-image
  ```

  
### Cgroup
- Cgroups are a Linux kernel feature that enables the allocation and management of system resources among processes.
- Docker leverages cgroups to provide resource isolation and limitation for containers.
- Docker automatically creates and manages cgroups for containers based on the resource constraints specified during container creation.
- You can view the cgroup information for a running Docker container using the `docker inspect` command.
  
  ```bash
  docker inspect --format '{{.HostConfig.CgroupParent}}' <container_id>
  ```

### Cgroup V2
- Cgroup v2 is the next version of cgroups and brings improvements and changes to the original cgroups implementation.
- It introduces a unified hierarchy that simplifies the management of resources and provides a more consistent interface.
- To enable Cgroup v2 in Docker, you can use the `systemd.unified_cgroup_hierarchy` kernel parameter. Ensure it's set to 1 in your system.
- Start Docker with the unified cgroup hierarchy:
  
  ```bash
  dockerd --exec-opt native.cgroupdriver=systemd
  ```
- View the cgroup information with cgroup v2 enabled:
  
  ```bash
  docker inspect --format '{{.HostConfig.CgroupNamespace}}' <container_id>
  ```
  
Including these runtime configuration options will allow you to effectively manage your containers' resources, security, and networking needs. For a full list of available runtime configuration options, refer to Docker's [official documentation](https://docs.docker.com/engine/reference/run/).

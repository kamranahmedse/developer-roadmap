# cgroups

**cgroups** or **control groups** is a Linux kernel feature that allows you to allocate and manage resources, such as CPU, memory, network bandwidth, and I/O, among groups of processes running on a system. It plays a crucial role in providing resource isolation and limiting the resources that a running container can use.

Docker utilizes cgroups to enforce resource constraints on containers, allowing them to have a consistent and predictable behavior. Below are some of the key features and benefits of cgroups in the context of Docker containers:

### Resource Isolation

cgroups helps to confine each container to a specific set of resources, ensuring fair sharing of system resources among multiple containers. This enables better isolation between different containers, so that a misbehaving container does not consume all available resources, thereby negatively affecting other containers.

### Limiting Resources

With cgroups, you can set limits on various system resources used by a container, such as CPU, memory, and I/O. This helps to prevent a single container from consuming excessive resources and causing performance issues for other containers or the host system.

### Prioritizing Containers

By allocating different shares of resources, cgroups allows you to give preference or priority to certain containers. This can be useful in scenarios where some containers are more critical than others, or during high resource contention situations.

### Monitoring

cgroups also offers mechanisms for monitoring the resource usage of individual containers, which helps to gain insights into container performance and identify potential resource bottlenecks.

Overall, cgroups is an essential underlying technology in Docker. By leveraging cgroups, Docker provides a robust and efficient container runtime environment, ensuring the containers have the required resources while maintaining good overall system performance.
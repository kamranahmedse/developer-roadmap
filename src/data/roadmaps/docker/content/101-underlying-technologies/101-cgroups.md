# cgroups

**cgroups** or **control groups** is a Linux kernel feature that allows you to allocate and manage resources, such as CPU, memory, network bandwidth, and I/O, among groups of processes running on a system. It plays a crucial role in providing resource isolation and limiting the resources that a running container can use.

Docker utilizes cgroups to enforce resource constraints on containers, allowing them to have a consistent and predictable behavior. Below are some of the key features and benefits of cgroups in the context of Docker containers:

## Resource Isolation

cgroups helps to confine each container to a specific set of resources, ensuring fair sharing of system resources among multiple containers. This enables better isolation between different containers, so that a misbehaving container does not consume all available resources, thereby negatively affecting other containers.

Visit the following resources to learn more:

- [@official@Control Groups](https://www.docker.com/resources/what-container/#control-groups)
- [@article@Control Groups - Medium](https://medium.com/@furkan.turkal/how-does-docker-actually-work-the-hard-way-a-technical-deep-diving-c5b8ea2f0422)

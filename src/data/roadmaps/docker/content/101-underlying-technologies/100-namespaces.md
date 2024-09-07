# Namespaces

Namespaces are one of the core technologies that Docker uses to provide isolation between containers. In this section, we'll briefly discuss what namespaces are and how they work.

## What are Namespaces?

In the Linux kernel, namespaces are a feature that allows the isolation of various system resources, making it possible for a process and its children to have a view of a subset of the system that is separate from other processes. Namespaces help to create an abstraction layer to keep containerized processes separate from one another and from the host system.

There are several types of namespaces in Linux, including:

- **PID (Process IDs)**: Isolates the process ID number space, which means that processes within a container only see their own processes, not those on the host or in other containers.
- **Network (NET)**: Provides each container with a separate view of the network stack, including its own network interfaces, routing tables, and firewall rules.
- **Mount (MNT)**: Isolates the file system mount points in such a way that each container has its own root file system, and mounted resources appear only within that container.
- **UTS (UNIX Time Sharing System)**: Allows each container to have its own hostname and domain name, separate from other containers and the host system.
- **User (USER)**: Maps user and group identifiers between the container and the host, so different permissions can be set for resources within the container.
- **IPC (Inter-Process Communication)**: Allows or restricts the communication between processes in different containers.

Visit the following resources to learn more:

- [@official@Docker Namespaces](https://docs.docker.com/engine/security/userns-remap/)

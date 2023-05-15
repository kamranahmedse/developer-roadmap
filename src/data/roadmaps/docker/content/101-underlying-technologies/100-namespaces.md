# Namespaces

Namespaces are one of the core technologies that Docker uses to provide isolation between containers. In this section, we'll briefly discuss what namespaces are and how they work.

### What are Namespaces?

In the Linux kernel, namespaces are a feature that allows the isolation of various system resources, making it possible for a process and its children to have a view of a subset of the system that is separate from other processes. Namespaces help to create an abstraction layer to keep containerized processes separate from one another and from the host system.

There are several types of namespaces in Linux, including:

- **PID (Process IDs)**: Isolates the process ID number space, which means that processes within a container only see their own processes, not those on the host or in other containers.
- **Network (NET)**: Provides each container with a separate view of the network stack, including its own network interfaces, routing tables, and firewall rules.
- **Mount (MNT)**: Isolates the file system mount points in such a way that each container has its own root file system, and mounted resources appear only within that container.
- **UTS (UNIX Time Sharing System)**: Allows each container to have its own hostname and domain name, separate from other containers and the host system.
- **User (USER)**: Maps user and group identifiers between the container and the host, so different permissions can be set for resources within the container.
- **IPC (Inter-Process Communication)**: Allows or restricts the communication between processes in different containers.

### How Docker uses Namespaces

Docker uses namespaces to create isolated environments for containers. When a container is started, Docker creates a new set of namespaces for that container. These namespaces only apply within the container, so any processes running inside the container have access to a subset of system resources that are isolated from other containers as well as the host system.

By leveraging namespaces, Docker ensures that containers are truly portable and can run on any system without conflicts or interference from other processes or containers running on the same host.

In summary, namespaces provide a level of resource isolation that enables running multiple containers with separate system resources within the same host, without them interfering with each other. This is a critical feature that forms the backbone of Docker's container technology.
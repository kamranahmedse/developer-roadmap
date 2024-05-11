# Underlying Technologies

Understanding the core technologies that power Docker will provide you with a deeper insight into how Docker works and will help you use the platform more effectively.

## Linux Containers (LXC)

Linux Containers (LXC) enables running multiple independent Linux systems on a single computer. Acting as isolated spaces, LXC containers share host resources like memory and processing power, without needing their own full operating system copy, ensuring lightweight and fast startup. Portable across compatible Linux systems, they find utility in diverse tasks such as running separate applications, testing software, or deploying cloud services. With user-friendly management tools available, LXC simplifies container creation, monitoring, and management.

## Control Groups (cgroups)

Control Groups (cgroups) is a Linux kernel feature that allows the allocation and management of resources like CPU, memory, and I/O to a set of processes. Docker leverages cgroups to limit the resources used by containers and ensure that one container does not monopolize the resources of the host system.

## Union File Systems (UnionFS)

UnionFS is a file system service that allows the overlaying of multiple file systems in a single, unified view. Docker uses UnionFS to create a layered approach for images and containers, which enables better sharing of common files and faster container creation.

## Namespaces

Namespaces are another Linux kernel feature that provides process isolation. They allow Docker to create isolated workspaces called containers. Namespaces ensure that processes within a container cannot interfere with processes outside the container or on the host system. There are several types of namespaces, like PID, NET, MNT, and USER, each responsible for isolating a different aspect of a process.

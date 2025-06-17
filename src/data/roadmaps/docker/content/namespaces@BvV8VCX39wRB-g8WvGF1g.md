# What are Namespaces?

Docker namespaces are a Linux kernel feature that creates isolated environments for containers by providing separate instances of global system resources. Docker uses PID, NET, MNT, UTS, IPC, and USER namespaces to ensure each container believes it has its own unique resources, enabling lightweight, portable, and secure containerization.

Visit the following resources to learn more:

- [@official@Docker Namespaces](https://docs.docker.com/engine/security/userns-remap/)
- [@article@Linux Namespaces](https://man7.org/linux/man-pages/man7/namespaces.7.html)

# What are Namespaces?

Docker namespaces are a fundamental feature of Linux that Docker uses to create isolated environments for containers. They provide a layer of isolation by creating separate instances of global system resources, making each container believe it has its own unique set of resources. Docker utilizes several types of namespaces, including PID (Process ID), NET (Network), MNT (Mount), UTS (Unix Timesharing System), IPC (InterProcess Communication), and USER namespaces and by leveraging these namespaces, Docker can create lightweight, portable, and secure containers that run consistently across different environments.

Visit the following resources to learn more:

- [@official@Docker Namespaces](https://docs.docker.com/engine/security/userns-remap/)
- [@article@Linux Namespaces](https://man7.org/linux/man-pages/man7/namespaces.7.html)

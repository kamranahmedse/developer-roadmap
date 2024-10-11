# Bare Metal vs VM vs Containers

## Bare Metal

Bare metal is a term used to describe a computer that is running directly on the hardware without any virtualization. This is the most performant way to run an application, but it is also the least flexible. You can only run one application per server, and you cannot easily move the application to another server. Virtual machines (VMs) are a way to run multiple applications on a single server. Each VM runs on top of a hypervisor, which is a piece of software that emulates the hardware of a computer. The hypervisor allows you to run multiple operating systems on a single server, and it also provides isolation between applications running on different VMs. Containers are a way to run multiple applications on a single server without the overhead of a hypervisor. Each container runs on top of a container engine, which is a piece of software that emulates the operating system of a computer.

You can learn more from the following resources:

- [@article@History of Virtualization](https://courses.devopsdirective.com/docker-beginner-to-pro/lessons/01-history-and-motivation/03-history-of-virtualization)
- [@article@Bare Metal Machine](https://glossary.cncf.io/bare-metal-machine/)
- [@article@What is a Virtual Machine?](https://azure.microsoft.com/en-au/resources/cloud-computing-dictionary/what-is-a-virtual-machine)

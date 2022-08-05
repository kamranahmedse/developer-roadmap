# Containers

Containers are a construct in which [cgroups](https://en.wikipedia.org/wiki/Cgroups), [namespaces](https://en.wikipedia.org/wiki/Linux_namespaces), and [chroot](https://en.wikipedia.org/wiki/Chroot) are used to fully encapsulate and isolate a process.  This encapsulated process, called a container image, shares the kernel of the host with other containers, allowing containers to be significantly smaller and faster than virtual machines.

These images are designed for portability, allowing for full local testing of a static image, and easy deployment to a container management platform.

<ResourceGroupTitle>Free Content</ResourceGroupTitle>
<BadgeLink colorScheme='yellow' badgeText='Read' href='https://cloud.google.com/learn/what-are-containers'>What are Containers?</BadgeLink>
<BadgeLink colorScheme='yellow' badgeText='Read' href='https://www.docker.com/resources/what-container/'>What is a Container?</BadgeLink>

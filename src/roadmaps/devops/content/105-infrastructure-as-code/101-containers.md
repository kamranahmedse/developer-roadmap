# Containers

Containers are a construct in which [cgroups](https://en.wikipedia.org/wiki/Cgroups), [namespaces](https://en.wikipedia.org/wiki/Linux_namespaces), and [chroot](https://en.wikipedia.org/wiki/Chroot) are used to fully encapsulate and isolate a process.  This encapsulated process, called a container image, shares the kernel of the host with other containers, allowing containers to be significantly smaller and faster than virtual machines.

These images are designed for portability, allowing for full local testing of a static image, and easy deployment to a container management platform.

{% resources %}
  {% Blog "https://cloud.google.com/learn/what-are-containers", "What are Containers?" %}
  {% Blog "https://www.docker.com/resources/what-container/", "What is a Container?" %}
  {% Blog "https://www.youtube.com/playlist?list=PLawsLZMfND4nz-WDBZIj8-nbzGFD4S9oz", "What are Containers?" %}
  {% Blog "https://thenewstack.io/category/containers/", "Articles about Containers - The New Stack" %}
{% endresources %}

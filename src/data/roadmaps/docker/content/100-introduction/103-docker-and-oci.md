# Docker and OCI

The [Open Container Initiative (OCI)](https://opencontainers.org/) is a Linux Foundation project which aims at creating industry standards for container formats and runtimes. Its primary goal is to ensure the compatibility and interoperability of container environments through defined technical specifications.

### Docker's role in OCI

[Docker](https://www.docker.com/) is one of the founding members of the OCI, and it has played a pivotal role in shaping the standards for container formats and runtimes. Docker initially developed the container runtime (Docker Engine) and image format (Docker Image) that serve as the basis for OCI specifications.

### OCI Specifications

OCI has two main specifications:

- **Runtime Specification (runtime-spec):** It defines the specification for executing a container via an isolation technology, like a container engine. The container runtime built by Docker, called 'containerd', has guided the development of the OCI runtime-spec.

- **Image Specification (image-spec):** It defines the container image format, which describes the contents of a container and can be run by a compliant runtime. Docker's initial image format has led to the creation of the OCI image-spec.

### Compatibility between Docker and OCI

Docker remains committed to supporting the OCI specifications and, since its involvement in OCI, has continuously updated its software to be compliant with OCI standards. Docker's containerd runtime and image format are fully compatible with OCI specifications, enabling Docker containers to be run by other OCI-compliant container runtimes and vice versa.

In summary, Docker and the Open Container Initiative work together to maintain standardization and compatibility within the container industry. Docker has played a significant role in the development of the OCI specifications, ensuring that the container ecosystem remains healthy, interoperable, and accessible to a wide range of users and platforms across the industry.
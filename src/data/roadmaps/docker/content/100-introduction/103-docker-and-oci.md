# Docker and OCI

The [Open Container Initiative (OCI)](https://opencontainers.org/) is a Linux Foundation project which aims at creating industry standards for container formats and runtimes. Its primary goal is to ensure the compatibility and interoperability of container environments through defined technical specifications.

## OCI Specifications

OCI has three main specifications:

- **Runtime Specification (runtime-spec):** It defines the specification for executing a container via an isolation technology, like a container engine. The container runtime built by Docker, called 'containerd', has guided the development of the OCI runtime-spec.

- **Image Specification (image-spec):** It defines the container image format, which describes the contents of a container and can be run by a compliant runtime. Docker's initial image format has led to the creation of the OCI image-spec.

- **Distribution Specification (distribution-spec):** It defines an API protocol to facilitate and standardize the distribution of content. Docker's existing registry API served as a starting point and heavily influenced the design of the OCI Distro Spec.

You can learn more from the following resources:

- [@official@Open Container Initiative](https://opencontainers.org/)
- [@article@OCI - Wikipedia](https://en.wikipedia.org/wiki/Open_Container_Initiative)

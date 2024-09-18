# Docker Basics

Docker is a platform that simplifies the process of building, packaging, and deploying applications in lightweight, portable containers. In this section, we'll cover the basics of Docker, its components, and key commands you'll need to get started.

## What is a Container?

A container is a lightweight, standalone, and executable software package that includes all the dependencies (libraries, binaries, and configuration files) required to run an application. Containers isolate applications from their environment, ensuring they work consistently across different systems.

## Docker Components

There are three key components in the Docker ecosystem:

- **Dockerfile**: A text file containing instructions (commands) to build a Docker image.
- **Docker Image**: A snapshot of a container, created from a Dockerfile. Images are stored in a registry, like Docker Hub, and can be pulled or pushed to the registry.
- **Docker Container**: A running instance of a Docker image.

## Docker Commands

Below are some essential Docker commands you'll use frequently:

- `docker pull <image>`: Download an image from a registry, like Docker Hub.
- `docker build -t <image_name> <path>`: Build an image from a Dockerfile, where `<path>` is the directory containing the Dockerfile.
- `docker image ls`: List all images available on your local machine.
- `docker run -d -p <host_port>:<container_port> --name <container_name> <image>`: Run a container from an image, mapping host ports to container ports.
- `docker container ls`: List all running containers.
- `docker container stop <container>`: Stop a running container.
- `docker container rm <container>`: Remove a stopped container.
- `docker image rm <image>`: Remove an image from your local machine.

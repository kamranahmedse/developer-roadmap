# Docker Basics

Docker is a platform that makes it easier to build, package, and run applications using lightweight, portable containers. It ensures your app behaves the same on any system — from a developer’s laptop to a cloud server.

## What is a Container?

A container is like a box that holds everything an app needs to run:
      - Your app’s code
      - System tools and libraries
      - Config files

Think of it like a lunchbox 🍱: wherever you take it — home, school, office — your lunch stays the same. Likewise, containers ensure your app behaves consistently across machines.

## Docker Components

There are three key components in the Docker ecosystem:

- **Dockerfile**: 	A recipe that tells Docker how to build an image.
- **Docker Image**: A snapshot of the app and its environment, created from a Dockerfile.
- **Docker Container**: A running instance of an image — like launching the app from a template.

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

## Docker Commands

Docker containers are ephemeral. When you delete them, they’re gone — unless you save data using volumes.

# Docker Images

Docker images are lightweight, standalone, and executable packages that include everything needed to run an application. These images contain all necessary dependencies, libraries, runtime, system tools, and code to enable the application to run consistently across different environments.

## Working with Docker Images

Docker CLI provides several commands to manage and work with Docker images. Some essential commands include:

- `docker image ls`: List all available images on your local system.
- `docker build`: Build an image from a Dockerfile.
- `docker image rm`: Remove one or more images.
- `docker pull`: Pull an image from a registry (e.g., Docker Hub) to your local system.
- `docker push`: Push an image to a repository.

For example, to pull the official Ubuntu image from Docker Hub, you can run the following command:

```bash
docker pull ubuntu:latest
```

After pulling the image, you can create and run a container using that image with the `docker run` command:

```bash
docker run -it ubuntu:latest /bin/bash
```

This command creates a new container and starts an interactive session inside the container using the `/bin/bash` shell.

## Sharing Images

Docker images can be shared and distributed using container registries, such as Docker Hub, Google Container Registry, or Amazon Elastic Container Registry (ECR). Once your images are pushed to a registry, others can easily access and utilize them.

To share your image, you first need to tag it with a proper naming format:

```bash
docker tag <image-id> <username>/<repository>:<tag>
```

Then, you can push the tagged image to a registry using:

```bash
docker push <username>/<repository>:<tag>
```

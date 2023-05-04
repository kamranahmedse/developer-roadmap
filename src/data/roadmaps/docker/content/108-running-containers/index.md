# Running Containers

In this section, we will explore running Docker containers. A container is an isolated environment that runs a single application or a group of applications. Containers are lightweight and portable, allowing for easy sharing and deployment.

## Starting a New Container

To start a new container, we use the `docker run` command followed by the image name. The basic syntax is as follows:

```
docker run [options] IMAGE [COMMAND] [ARG...]
```

For example, to run the official Nginx image, we would use:

```
docker run -d -p 8080:80 nginx
```

This starts a new container and maps the host's port 8080 to the container's port 80.

## Listing Containers

To list all running containers, use the `docker ps` command. To view all containers (including those that have stopped), use the `-a` flag:

```
docker ps -a
```

## Accessing Containers

To access a running container's shell, use the `docker exec` command:

```
docker exec -it CONTAINER_ID bash
```

Replace `CONTAINER_ID` with the ID or name of your desired container. You can find this in the output of `docker ps`.

## Stopping Containers

To stop a running container, use the `docker stop` command followed by the container ID or name:

```
docker stop CONTAINER_ID
```

## Removing Containers

Once a container is stopped, we can remove it using the `docker rm` command followed by the container ID or name:

```
docker rm CONTAINER_ID
```

To automatically remove containers when they exit, add the `--rm` flag when running a container:

```
docker run --rm IMAGE
```

In this section, we covered the basics of running Docker containers, including starting, accessing, stopping, and removing containers. Now you can confidently manage containers and build powerful applications using Docker.
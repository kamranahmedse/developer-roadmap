# Running Containers

To start a new container, we use the `docker run` command followed by the image name. The basic syntax is as follows:

```bash
docker run [options] IMAGE [COMMAND] [ARG...]
```

For example, to run the official Nginx image, we would use:

```bash
docker run -d -p 8080:80 nginx
```

This starts a new container and maps the host's port 8080 to the container's port 80.

## Listing Containers

To list all running containers, use the `docker container ls` command. To view all containers (including those that have stopped), use the `-a` flag:

```bash
docker container ls -a
```

## Accessing Containers

To access a running container's shell, use the `docker exec` command:

```bash
docker exec -it CONTAINER_ID bash
```

Replace `CONTAINER_ID` with the ID or name of your desired container. You can find this in the output of `docker container ls`.

## Stopping Containers

To stop a running container, use the `docker stop` command followed by the container ID or name:

```bash
docker container stop CONTAINER_ID
```

## Removing Containers

Once a container is stopped, we can remove it using the `docker rm` command followed by the container ID or name:

```bash
docker container rm CONTAINER_ID
```

To automatically remove containers when they exit, add the `--rm` flag when running a container:

```bash
docker run --rm IMAGE
```
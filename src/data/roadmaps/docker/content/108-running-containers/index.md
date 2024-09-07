# Running Containers

To start a new container, we use the `docker run` command followed by the image name. The basic syntax is as follows:

```bash
docker run [options] IMAGE [COMMAND] [ARG...]
```

For example, to run the official Nginx image, we would use:

```bash
docker run -d -p 8080:80 nginx
```

To list all running containers, use the `docker container ls` command.

```bash
docker container ls -a
```

To access a running container's shell, use the `docker exec` command:

```bash
docker exec -it CONTAINER_ID bash
```

To stop a running container, use the `docker stop` command followed by the container ID or name:

```bash
docker container stop CONTAINER_ID
```

```bash
docker container rm CONTAINER_ID
```

Visit the following resources to learn more:

- [@official@Docker Run](https://docs.docker.com/engine/reference/commandline/run/)
- [@official@Docker Containers](https://docs.docker.com/engine/reference/commandline/container/)
- [@official@Docker Exec](https://docs.docker.com/engine/reference/commandline/exec/)
- [@official@Docker Stop](https://docs.docker.com/engine/reference/commandline/stop/)

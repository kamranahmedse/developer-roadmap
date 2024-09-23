# Running Containers

The `docker run` command creates a new container from the specified image and starts it.

The basic syntax for the `docker run` command is as follows:

```bash
docker run [OPTIONS] IMAGE [COMMAND] [ARG...]
```

- `OPTIONS`: These are command-line flags that can be used to adjust the container's settings, like memory constraints, ports, environment variables, etc.
- `IMAGE`: The Docker image that the container will run. This can be an image from Docker Hub or your own image that is stored locally.
- `COMMAND`: This is the command that will be executed inside the container when it starts. If not specified, the default entrypoint of the image will be used.
- `ARG...`: These are optional arguments that can be passed to the command being executed.

## Examples

Here are some sample commands to help you understand how to use `docker run`:

- Run an interactive session of an Ubuntu container:

```bash
docker run -it --name=my-ubuntu ubuntu
```

- Run an Nginx web server and publish the port 80 on the host:

```bash
docker run -d --name=my-nginx -p 80:80 nginx
```

Visit the following resources to learn more:

- [@official@Docker Run](https://docs.docker.com/engine/reference/commandline/run/)

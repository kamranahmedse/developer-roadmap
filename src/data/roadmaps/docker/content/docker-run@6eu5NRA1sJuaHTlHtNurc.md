# Running Containers

The `docker run` command creates and starts a new container from a specified image. It combines `docker create` and `docker start` operations, offering a range of options to customize the container's runtime environment. Users can set environment variables, map ports and volumes, define network connections, and specify resource limits. The command supports detached mode for background execution, interactive mode for shell access, and the ability to override the default command defined in the image. Common flags include `-d` for detached mode, `-p` for port mapping, `-v` for volume mounting, and `--name` for assigning a custom container name. Understanding `docker run` is fundamental to effectively deploying and managing Docker containers.

Visit the following resources to learn more:

- [@official@Docker Run](https://docs.docker.com/engine/reference/commandline/run/)

# Command Line Utilities

Docker images can include command line utilities or standalone applications that we can run inside containers.

## BusyBox

BusyBox is a small (1-2 Mb) and simple command line application that provides a large number of the commonly used Unix utilities, such as `awk`, `grep`, `vi`, etc. To run BusyBox inside a Docker container, you simply need to pull the image and run it with Docker:

```bash
docker pull busybox
docker run -it busybox /bin/sh
```

### cURL

cURL is a well-known command line tool that can be used to transfer data using various network protocols. It is often used for testing APIs or downloading files from the internet. To use cURL inside a Docker container, you can use the official cURL image available on Docker Hub:

```bash
docker pull curlimages/curl
docker run --rm curlimages/curl https://example.com
```

In this example, the `--rm` flag is used to remove the container after the command has finished running. 

### Other Command Line Utilities

There are numerous command line utilities available in Docker images, including but not limited to:

- `wget`: A free utility for non-interactive download of files from the Web.
- `imagemagick`: A powerful software suite for image manipulation and conversion.
- `jq`: A lightweight and flexible command-line JSON processor.

Visit the following resources to learn more:

- [@official@Docker Images](https://docs.docker.com/engine/reference/commandline/images/)
- [@official@Docker Run](https://docs.docker.com/reference/cli/docker/container/run/)
- [@official@Docker Pull](https://docs.docker.com/engine/reference/commandline/pull/)

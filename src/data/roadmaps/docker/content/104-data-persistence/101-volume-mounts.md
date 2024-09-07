# Volume Mounts

Volume mounts are a way to map a folder or file on the host system to a folder or file inside a container. This allows the data to persist outside the container even when the container is removed. Additionally, multiple containers can share the same volume, making data sharing between containers easy.

## Creating a Volume

To create a volume in Docker, you need to run the following command:

```bash
docker volume create my-volume
```

This command will create a volume named `my-volume`. You can inspect the details of the created volume using the command:

```bash
docker volume inspect my-volume
```

## Mounting a Volume in a Container

To mount a volume to a container, you need to use the `-v` or `--mount` flag while running the container. Here's an example:

Using `-v` flag:

```bash
docker run -d -v my-volume:/data your-image
```

Using `--mount` flag:

```bash
docker run -d --mount source=my-volume,destination=/data your-image
```

In both examples above, `my-volume` is the name of the volume we created earlier, and `/data` is the path inside the container where the volume will be mounted.

> For an in-depth exploration of the `-v` and `--mount` flags, consult Docker's official guide on .

## Sharing Volumes Between Containers

To share a volume between multiple containers, simply mount the same volume on multiple containers. Here's how to share `my-volume` between two containers running different images:

```bash
docker run -d -v my-volume:/data1 image1
docker run -d -v my-volume:/data2 image2
```

In this example, `image1` and `image2` would have access to the same data stored in `my-volume`.

## Removing a Volume

To remove a volume, you can use the `docker volume rm` command followed by the volume name:

```bash
docker volume rm my-volume
```

Visit the following resources to learn more:

- [@official@Docker Volumes](https://docs.docker.com/storage/volumes/).
- [@official@Docker Volume Flags](https://docs.docker.com/storage/bind-mounts/#choose-the--v-or---mount-flag)

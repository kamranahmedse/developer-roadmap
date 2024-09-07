# Common Docker Commands

Once you have created the Dockerfile, you can build the image using the `docker build` command. Execute the following command in the terminal from the directory containing the Dockerfile:

```sh
docker build -t your-image-name .
```

This command tells Docker to build an image using the Dockerfile in the current directory (`.`), and assign it a name (`-t your-image-name`).

## Inspecting Images and Layers

After a successful build, you can inspect the created image using `docker image` command:

```sh
docker image ls
```

To take a closer look at the individual layers of an image, use the `docker history` command:

```sh
docker history your-image-name
```

To view the layers of an image, you can also use the `docker inspect` command:

```sh
docker inspect your-image-name
```

To remove an image, use the `docker image rm` command:

```sh
docker image rm your-image-name
```

## Pushing Images to a Registry

Once your image is built, you can push it to a container registry (e.g., Docker Hub, Google Container Registry, etc.) to easily distribute and deploy your application. First, log in to the registry using your credentials:

```sh
docker login
```

Then, tag your image with the registry URL:

```sh
docker tag your-image-name username/repository:tag
```

Finally, push the tagged image to the registry:

```sh
docker push username/repository:tag
```

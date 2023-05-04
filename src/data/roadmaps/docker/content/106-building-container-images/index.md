# Building Container Images

In this section, we will discuss the process of building container images, which are the foundation of Docker containers. Container images are executable packages that include everything required to run an application: code, runtime, system tools, libraries, and settings. By building custom images, you can deploy applications seamlessly with all their dependencies on any Docker-supported platform.

## Dockerfile

The key component in building a container image is the `Dockerfile`. It is essentially a script containing instructions on how to assemble a Docker image. Each instruction in the Dockerfile creates a new layer in the image, making it easier to track changes and minimize the image size. Here's a simple example of a Dockerfile:

```
# Use an official Python runtime as a parent image
FROM python:3.7-slim

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install --trusted-host pypi.python.org -r requirements.txt

# Make port 80 available to the world outside this container
EXPOSE 80

# Define environment variable
ENV NAME World

# Run app.py when the container launches
CMD ["python", "app.py"]
```

## Building an Image

Once you have created the Dockerfile, you can build the image using the `docker build` command. Execute the following command in the terminal from the directory containing the Dockerfile:

```sh
docker build -t your-image-name .
```

This command tells Docker to build an image using the Dockerfile in the current directory (`.`), and assign it a name (`-t your-image-name`).

## Inspecting Images and Layers

After a successful build, you can inspect the created image using `docker images` command:

```sh
docker images
```

To take a closer look at the individual layers of an image, use the `docker history` command:

```sh
docker history your-image-name
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

## Conclusion

Building container images is a crucial aspect of using Docker, as it enables you to package and deploy your applications with ease. By creating a Dockerfile with precise instructions, you can effortlessly build and distribute images across various platforms.
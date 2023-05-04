# Dockerfiles

In this section, we will discuss Dockerfiles, which are essential for building container images.

### What is a Dockerfile?

A Dockerfile is a text document that contains a list of instructions used by the Docker engine to build an image. Each instruction in the Dockerfile adds a new layer to the image. Docker will build the image based on these instructions, and then you can run containers from the image. Dockerfiles are one of the main elements of *infrastructure as code*.

### Structure of a Dockerfile

A Dockerfile is organized in a series of instructions, one per line. Each instruction has a specific format.

```
INSTRUCTION arguments
```

The following is an example of a simple Dockerfile:

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

### Common Dockerfile Instructions

Here's a list of some common Dockerfile instructions and their purpose:

- `FROM`: Sets the base image to begin with. It is mandatory to have `FROM` as the first instruction in the Dockerfile.
- `WORKDIR`: Sets the working directory for any `RUN`, `CMD`, `ENTRYPOINT`, `COPY` or `ADD` instructions. If the directory does not exist, it will be created automatically.
- `COPY`: Copies files or directories from the host into the container's file system.
- `ADD`: Similar to `COPY`, but can also handle remote URLs and automatically unpack archives.
- `RUN`: Executes a command within the image as a new layer.
- `CMD`: Defines the default command to execute when running a container from the image.
- `ENTRYPOINT`: Similar to `CMD`, but it's designed to allow a container as an executable with its own parameters.
- `EXPOSE`: Informs Docker that the container will listen on the specified network ports at runtime.
- `ENV`: Sets environment variables for the container.

### Building an Image from a Dockerfile

To build an image from the Dockerfile, use the `docker build` command, specifying the build context (usually the current directory), and an optional tag for the image.

```
docker build -t my-image:tag .
```

After running this command, Docker will execute each instruction in the Dockerfile, in order, creating a new layer for each.

Now you have a clear understanding of Dockerfiles, their structure, and their most important instructions. In the next sections, we will discuss how to manage and deploy containerized applications effectively.
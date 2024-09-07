# Building Container Images

Container images are executable packages that include everything required to run an application: code, runtime, system tools, libraries, and settings. By building custom images, you can deploy applications seamlessly with all their dependencies on any Docker-supported platform.

## Dockerfile

The key component in building a container image is the `Dockerfile`. It is essentially a script containing instructions on how to assemble a Docker image. Each instruction in the Dockerfile creates a new layer in the image, making it easier to track changes and minimize the image size. Here's a simple example of a Dockerfile:

```dockerfile
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

Visit the following resources to learn more:

- [@official@Docker Image Builder](https://docs.docker.com/reference/cli/docker/buildx/build/)
- [@official@Dockerfile Reference](https://docs.docker.com/engine/reference/builder/)
- [@opensource@Dockerfile Examples](https://github.com/dockersamples)
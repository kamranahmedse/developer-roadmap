# Dockerfile

A Dockerfile is a text document that contains a list of instructions used by the Docker engine to build an image. Each instruction in the Dockerfile adds a new layer to the image. Docker will build the image based on these instructions, and then you can run containers from the image.

## Structure of a Dockerfile

A Dockerfile is organized in a series of instructions, one per line. Each instruction has a specific format.

```bash
INSTRUCTION arguments
```

The following is an example of a simple Dockerfile:

```bash
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

- [@official@Dockerfile Reference](https://docs.docker.com/engine/reference/builder/)
- [@official@Dockerfile Best Practices](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)
- [@opensource@Dockerfile Examples](https://github.com/dockersamples)

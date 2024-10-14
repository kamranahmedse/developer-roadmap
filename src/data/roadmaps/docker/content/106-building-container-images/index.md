# Building Container Images

Container images are executable packages that include everything required to run an application: code, runtime, system tools, libraries, and settings. By building custom images, you can deploy applications seamlessly with all their dependencies on any Docker-supported platform. The key component in building a container image is the `Dockerfile`. It is essentially a script containing instructions on how to assemble a Docker image. Each instruction in the Dockerfile creates a new layer in the image, making it easier to track changes and minimize the image size. Here's a simple example of a Dockerfile:

Visit the following resources to learn more:

- [@official@Docker Image Builder](https://docs.docker.com/reference/cli/docker/buildx/build/)
- [@official@Dockerfile Reference](https://docs.docker.com/engine/reference/builder/)
- [@opensource@Dockerfile Examples](https://github.com/dockersamples)

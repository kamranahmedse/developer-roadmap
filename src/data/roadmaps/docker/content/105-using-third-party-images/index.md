# Using Third Party Images

Third-party images are pre-built Docker container images that are available on [Docker Hub](https://hub.docker.com) or other container registries. These images are created and maintained by individuals or organizations and can be used as a starting point for your containerized applications.

## Using an Image in Your Dockerfile

For example: If you're looking for a `Node.js` image, you can search for "node" on Docker Hub and you'll find the official Node.js image along with many other community-maintained images.

To use a third-party image in your Dockerfile, simply set the image name as the base image using the `FROM` directive. Here's an example using the official Node.js image:

```dockerfile
FROM node:20

# The rest of your Dockerfile...
```

Visit the following resources to learn more:

- [@official@Docker Hub Registry](https://hub.docker.com/)

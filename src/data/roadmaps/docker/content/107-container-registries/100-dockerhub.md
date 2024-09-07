# DockerHub

[DockerHub](https://hub.docker.com/) is a cloud-based registry service provided by Docker Inc. It is the default public container registry where you can store, manage, and distribute your Docker images.

## Features of DockerHub

- **Public and private repositories:** Store your images in public repositories that are accessible to everyone, or opt for private repositories with access limited to your team or organization.

- **Automated Builds:** DockerHub integrates with popular code repositories such as GitHub and Bitbucket, allowing you to set up automated builds for your Docker images

- **Webhooks:** DockerHub allows you to configure webhooks to notify other applications or services when an image has been built or updated.

- **Organizations and Teams:** Make collaboration easy by creating organizations and teams to manage access to your images and repositories.

- **Official Images:** DockerHub provides a curated set of official images for popular software like MongoDB, Node.js, Redis, etc. These images are maintained by Docker Inc.

To push an image to DockerHub, you need to log in to the registry using your DockerHub credentials:

```bash
docker tag your-image your-username/your-repository:your-tag
docker push your-username/your-repository:your-tag
```

To pull images from DockerHub, you can use the `docker pull` command:

```bash
docker pull your-username/your-repository:your-tag
```

Visit the following resources to learn more:

- [@official@DockerHub](https://hub.docker.com/)
- [@official@DockerHub Repositories](https://docs.docker.com/docker-hub/repos/)
- [@official@DockerHub Webhooks](https://docs.docker.com/docker-hub/webhooks/)

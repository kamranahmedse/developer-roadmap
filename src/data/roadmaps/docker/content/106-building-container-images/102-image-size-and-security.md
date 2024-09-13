# Reducing Image Size

- **Use an appropriate base image:** Choose a smaller, more lightweight base image that includes only the necessary components for your application. For example, consider using the `alpine` variant of an official image, if available, as it's typically much smaller in size.

  ```dockerfile
  FROM node:14-alpine
  ```

- **Run multiple commands in a single `RUN` statement:** Each `RUN` statement creates a new layer in the image, which contributes to the image size. Combine multiple commands into a single `RUN` statement using `&&` to minimize the number of layers and reduce the final image size.

  ```dockerfile
  RUN apt-get update && \
      apt-get install -y some-required-package
  ```

- **Remove unnecessary files in the same layer:** When you install packages or add files during the image build process, remove temporary or unused files in the same layer to reduce the final image size.

  ```dockerfile
  RUN apt-get update && \
      apt-get install -y some-required-package && \
      apt-get clean && \
      rm -rf /var/lib/apt/lists/*
  ```

- **Use multi-stage builds:** Use multi-stage builds to create smaller images. Multi-stage builds allow you to use multiple `FROM` statements in your Dockerfile. Each `FROM` statement creates a new stage in the build process. You can copy files from one stage to another using the `COPY --from` statement.

- **Use `.dockerignore` file:** Use a `.dockerignore` file to exclude unnecessary files from the build context that might cause cache invalidation and increase the final image size.

  ```dockerfile
  node_modules
  npm-debug.log
  ```

Visit the following resources to learn more:

- [@official@Multi-stage builds](https://docs.docker.com/build/building/multi-stage/)
- [@official@Docker Best Practices](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)
- [@feed@Explore top posts about Security](https://app.daily.dev/tags/security?ref=roadmapsh)
